<script setup>
import { useStore } from 'vuex'
import { getLogisticsApi, saveOrderFormInfoApi } from '~/api/order-api'
import { toast } from 'vue-sonner'
const store = useStore()
const router = useRouter()
const route = useRoute()
const cartItems = computed(() => store.getters['cart/getItems'] || [])
const shippingFee = computed(() => store.getters['cart/getShipping'] || 0)
const totalPrice = computed(() => store.getters['cart/getTotal'] || 0)
const address = ref('')
const selectedDeliver = ref({})
const selectedPay = computed(() => store.getters['order/getSelectedPayment'] || {})
const alertText = '內容不能為空'

// 門店信息
const selectedStoreAddress = ref({
    storeid: '',
    storename: '',
    storeaddress: '',
    outside: '',
    ship: '',
    TempVar: ''
})

// 地圖選址相關數據
const mapService = reactive({
    ReturnUrl: '',
    CustomerID: '8290209801',
    postUrl: ''
})


// 計算小計
const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => {
        // 處理帶逗號的字符串
        const cleanTotal = typeof item.total === 'string' ? item.total.replace(/,/g, '') : item.total
        return sum + (parseFloat(cleanTotal) || 0)
    }, 0)
})
const steps = [
    { label: '購物車', number: 1 },
    { label: '填寫資料', number: 2 },
    { label: '訂單確認', number: 3 }
]
// 表單驗證狀態
const formErrors = reactive({
    address: false,
    deliver: false,
    payment: false
})
const selectsDeliver = ref([
    { id: 1, name: '宅配', lkey: '' },
])
const selectsPay = computed(() => store.getters['order/getPaymentList'] || [])

const removeItem = (id) => {
    store.dispatch('cart/removeFromCart', id)
}

//  計算子商品原始規格的輔助函數
const calculateOriginalSubs = (item) => {
    const currentCount = item.num;
    if (currentCount <= 0) return [];

    return item.sub.map(subitem => ({
        isubid: subitem.isubid,
        originalNum: Math.round(subitem.num / currentCount)  // 每份的原始數量
    }));
}
// 增加或減少數量
const changeQuantity = (item, type) => {
    // 計算新數量
    const newCount = type === 'add' ? item.num + 1 : item.num - 1
    // 檢查邊界條件
    if (newCount < 1) return
    const originalSubs = calculateOriginalSubs(item)
    // 構建子商品參數
    const selectedItems = originalSubs.map(subitem => ({
        item: subitem.isubid,
        num: subitem.originalNum * newCount
    }))
    // 構建產品參數
    const product = {
        action: 'UPDATE',
        id: item.item_id,
        quantity: newCount,
        param: selectedItems,
        type: 'NOR'
    }
    // 發送更新請求
    store.dispatch('cart/addToCart', product)
    toast.success('操作成功')
}
const getDeliver = async () => {
    const { data } = await getLogisticsApi()
    selectsDeliver.value.push(...data.cvs.map(item => ({
        id: item.id,
        name: item.name,
        lkey: item.lkey
    })))
}
const updateSelectsDeliver = (option) => {
    selectedDeliver.value = option
    // 保存到 sessionStorage
    if (process.client) {
        sessionStorage.setItem('logistics', JSON.stringify(option))
    }
    address.value=''
}

const updateSelectsPay = (option) => {
    store.dispatch('order/updateSelectedPayment', option)
}
// 驗證函數
const validateForm = () => {
    formErrors.address = !address.value.trim()
    formErrors.deliver = !selectedDeliver.value.name
    formErrors.payment = !selectedPay.value.name
    return !formErrors.address && !formErrors.deliver && !formErrors.payment
}
// 防抖定時器變量
let saveTimeout = null

// 防抖
const debouncedSaveOrderForm = (formData) => {
    // 清除之前的定時器
    if (saveTimeout) {
        clearTimeout(saveTimeout)
    }
    // 設置新的定時器
    saveTimeout = setTimeout(async () => {
        try {
            await saveOrderFormInfoApi(formData)
        } catch (error) {
            console.error('保存表單數據失敗:', error)
        }
    }, 500) // 500ms 延遲
}
// 清除地址錯誤狀態的函數
const clearAddressError = async () => {
    if (address.value.trim()) {
        formErrors.address = false
    }
    debouncedSaveOrderForm({
        address: address.value,
    })
}
const toCheckoutHandle = () => {
    // 驗證表單
    if (!validateForm()) return
    store.dispatch('order/updateOrderFormInfo', {
        address: address.value,
    })
    router.push('/checkout')
}
// 獲取選擇的物流信息
const getLogistic = () => {
    if (process.client) {
        const logistics = sessionStorage.getItem('logistics')
        if (!logistics) return false
        selectedDeliver.value = JSON.parse(logistics)
        return true
    }
}
// 初始化地圖服務
const initMapService = () => {
    // mapService.ReturnUrl = window.location.href
    mapService.ReturnUrl = `${window.location.origin}/map-callback`
    if (process.client) {
        if (window.innerWidth > 600) {
            mapService.postUrl = 'https://appservice.ezcat.com.tw/Map.aspx'
        } else {
            mapService.postUrl = 'https://appservice.ezcat.com.tw/MobileMap.aspx'
        }
    }
}
// 處理地圖服務返回的數
const handleMapCallback = () => {
    if (route.query.fromMap === 'true') {
        // 更新門店信息
        selectedStoreAddress.value = {
            storeid: route.query.storeid || '',
            storename: decodeURIComponent(route.query.storename || ''),
            storeaddress: decodeURIComponent(route.query.storeaddress || ''),
            outside: route.query.outside || '',
            ship: route.query.ship || '',
            TempVar: route.query.TempVar || ''
        }
        // 保存到 sessionStorage
        if (process.client) {
            sessionStorage.setItem('addressData', JSON.stringify(selectedStoreAddress.value))
        }
        // 設置完整地址
        if (selectedStoreAddress.value.storeaddress) {
            address.value = `${selectedStoreAddress.value.storeid}-${selectedStoreAddress.value.storename}-${selectedStoreAddress.value.storeaddress}`
            formErrors.address = false
        }
        router.replace('/cart')
    }
}
// 恢復門店信息的函數
const getSelectedStore = () => {
    if(selectedDeliver.value.name !== '速達快速到店') return
    if (process.client) {
        const savedStore = sessionStorage.getItem('addressData')
        if (savedStore) {
            try {
                const storeData = JSON.parse(savedStore)
                selectedStoreAddress.value = storeData

                // 如果有門店地址，自動設置到地址欄
                if (storeData.storeaddress) {
                    address.value = `${storeData.storeid}-${storeData.storename}-${storeData.storeaddress}`
                    formErrors.address = false
                }
                return true
            } catch (e) {
                console.error('解析保存的門店信息失敗:', e)
                return false
            }
        }
    }
    return false
}

onMounted(async () => {
    // 恢復之前保存的物流信息選項
    getLogistic()
    // 恢復門店信息
    getSelectedStore()
    // 初始化地圖服務
    initMapService()
    // 處理地圖回調數據
    handleMapCallback()
    // 獲取物流信息
    await getDeliver()
    // 獲取支付方式
    store.dispatch('order/getPaymentList')
    //獲取購物車商品
    store.dispatch('cart/fetchLatestCart')
    //當前進度
    store.dispatch('step/setCurrentStep', 1)


})
</script>

<template>
         <div v-if="cartItems.length > 0" class="bg-white py-10 md:px-20 px-5">
        <!-- 進度條 -->
        <ProgressBar :steps />
        <!-- 購物車表格 -->
        <div class="w-full mx-auto  border rounded  mt-14">
            <div class="h-16 flex items-center px-4 text-xl bg-gray-100">購物車 ({{ cartItems.length }} 件)</div>
            <div class=" border rounded overflow-hidden ">
                <!-- 表頭 -->
                <div class="hidden md:grid grid-cols-7 font-bold  text-center py-3">
                    <div class="col-span-2 text-start ml-4">商品資料</div>
                    <div>規格</div>
                    <div>單件價格</div>
                    <div>數量</div>
                    <div>小計</div>
                </div>
                <!-- 内容 -->
                <div v-for="item in cartItems" :key="item.id"
                    class=" md:grid grid-cols-7 items-center text-center border-t py-3">
                    <div class="col-span-2 flex items-center gap-4 pl-4">
                        <img :src="item.display_img_small" alt="" class="w-16 h-16 object-cover" />
                        <div class="text-left">
                            <div class="">{{ item.form_name }}</div>
                        </div>
                    </div>
                    <div class="hidden md:flex flex-col text-sm text-gray-500">
                        <span v-for="(spec, index) in item.sub" :key="index" :class="{
                            'text-red-500': spec.sub_type === 'SFREE'
                        }">
                            {{ spec.sub_type === 'SFREE' ? '贈品:' : '' }}{{ spec.form_name }}&times;{{ spec.num }}
                        </span>
                    </div>
                    <div>
                        <div class="font-bold">NT${{ item.price }}</div>
                        <!-- <div class="text-gray-400 line-through text-sm">NT${{ item.originalPrice }}</div> -->
                    </div>
                    <div>
                        <div class="inline-flex items-center border rounded box-border">
                            <button @click="changeQuantity(item, 'reduce')" class="px-2 w-8 border ">-</button>
                            <span class="px-3">{{ item.num }}</span>
                            <button @click="changeQuantity(item, 'add')" class="px-2 w-8 border">+</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <span class="font-bold">NT${{ item.total }}</span>

                    </div>
                    <div>
                        <button @click="removeItem(item.item_id)"
                            class="text-2xl font-bold text-gray-500 hover:text-red-600">&times;</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 付款方式和訂單咨詢表單 -->
        <div class="md:grid md:grid-cols-5 mt-14 gap-5 ">
            <!-- 選擇送貨及付款方式表單 -->
            <div class="col-span-3 border">
                <h2 class="text-xl p-4 bg-gray-100 border">選擇送貨及付款方式</h2>
                <!-- 表單内容 -->
                <div class="flex flex-col gap-3 p-3">
                    <div>
                        <span>送貨方式</span>
                        <Select :isOrder="true" :selects="selectsDeliver"  :initialValue="selectedDeliver"
                            @update:selected="updateSelectsDeliver" />
                        <span class="text-gray-500 text-sm">下單後3個工作天內出貨，出貨後5-14個工作天內到貨</span>
                    </div>
                    <div class="md:h-[85px]">
                        <span>送貨地點</span>
                        <input v-if="selectedDeliver.name !== '速達快速到店'" type="text" v-model="address" placeholder="收件地址"
                            @input="clearAddressError" :class="{ 'border-red-500 ': formErrors.address }"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                        <!-- ✅ 新增：地圖選址按鈕 -->
                        <div class="flex gap-5" v-else>
                            <form name="shop" method="post" :action="mapService.postUrl">
                                <input name="ReturnUrl" type="hidden" v-model="mapService.ReturnUrl">
                                <input name="CustomerID" type="hidden" v-model="mapService.CustomerID">
                                <button type="submit"
                                    class="px-3 py-2 bg-[#ac886b] text-white rounded hover:bg-[#8b5e3c] transition-colors  whitespace-nowrap">
                                    選擇位址
                                </button>
                            </form>
                            <input type="text" v-model="address" disabled
                                class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                            <!-- ✅ 新增：地圖選址按鈕 -->
                        </div>
                        <div class="h-5 mt-1">
                            <span v-if="formErrors.address" class="text-red-500 text-sm">{{ alertText }}</span>
                        </div>
                    </div>
                    <div>
                        <span>付款方式</span>
                        <Select :isOrder="true" :selects="selectsPay" @update:selected="updateSelectsPay" />
                    </div>
                </div>
            </div>
            <!-- 訂單資訊 -->
            <div class="col-span-2  border flex flex-col mt-3 md:mt-0">
                <h2 class="text-xl p-4 bg-gray-100 border-b">訂單資訊</h2>

                <!-- 內容區域填滿，高度自適應 -->
                <div class="flex flex-col justify-between flex-1 p-4 gap-4">
                    <!-- 上半部 -->
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>小計:</span>
                            <span>${{ subtotal }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>運費:</span>
                            <span :class="{ 'text-red-500': shippingFee === '0' }">
                                {{ shippingFee === '0' ? '免運費' : `NT$${shippingFee}(滿$1000元免運費)` }}
                            </span>
                        </div>
                        <hr />
                    </div>
                    <!-- 下半部 -->
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="font-bold">合計:</span>
                            <span class="text-2xl text-red-500 font-bold">${{ totalPrice }}</span>
                        </div>
                        <button @click="toCheckoutHandle"
                            class="w-full  bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-md transition-colors duration-300">
                            前往結賬
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
        <span class="text-gray-500 text-xl">購物車内沒有商品</span>
    </div>
</template>

<style scoped></style>