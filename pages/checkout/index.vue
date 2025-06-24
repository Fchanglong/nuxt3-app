<script setup>
import { useStore } from 'vuex'
import { saveOrderFormInfoApi } from '~/api/order-api'
const store = useStore()
const router = useRouter()
const cartItems = computed(() => store.getters['cart/getItems'] || [])
const shippingFee = computed(() => store.getters['cart/getShipping'] || 0)
const totalPrice = computed(() => store.getters['cart/getTotal'] || 0)
const isLoading = ref(false)
const alertText = '內容不能為空'
const formInfo = reactive({
    name: '',
    phone: '',
    address: '',
    note: ''
})
//發票表單信息
const invoiceFormInfo = reactive({
    company: '',
    email: '',
    identifier: '',
    type: 1
})
const steps = [
    { label: '購物車', number: 1 },
    { label: '填寫資料', number: 2 },
    { label: '訂單確認', number: 3 }
]
// 表單驗證狀態
const formErrors = reactive({
    address: false,
    name: false,
    phone: false,
    email: false
})
const invoiceTypes = ref([
    { id: 1, name: '愛心捐贈', type: 1 },
    { id: 2, name: '寄送至郵箱', type: 2 },
])
const InvoiceType = ref(invoiceTypes.value[0].name)
// 使用 computed 自動計算是否禁用
const isAddressDisabled = computed(() => {
    if (process.client) {
        const logistics = sessionStorage.getItem('logistics')
        if (logistics) {
            try {
                const logisticsData = JSON.parse(logistics)
                return logisticsData.name === '速達快速到店'
            } catch (e) {
                console.error('解析物流信息失敗:', e)
                return false
            }
        }
    }
    return false
})
// 驗證函數
const validateForm = () => {
    formErrors.address = !formInfo.address.trim()
    formErrors.name = !formInfo.name.trim()
    formErrors.phone = !formInfo.phone.trim()
    //判斷發票類型是否為寄送至郵箱
    formErrors.email = InvoiceType.value === '寄送至郵箱'
        ? !invoiceFormInfo.email.trim()
        : false

    return !formErrors.address && !formErrors.name && !formErrors.phone && !formErrors.email
}
const getCurrentInvoiceType = (option) => {
    invoiceFormInfo.type = option.type
    return InvoiceType.value = option.name
}
const submitOrder = async () => {
    if (!validateForm()) return
    isLoading.value = true
    await store.dispatch('order/createOrder', {
        name: formInfo.name,
        phone: formInfo.phone,
        address: formInfo.address,
        note: formInfo.note,
        email: invoiceFormInfo.email,
    })
    store.dispatch('order/updateInvoiceFormInfo', {
        type: invoiceFormInfo.type,
        email: invoiceFormInfo.email,
        identifier: invoiceFormInfo.identifier,
        company: invoiceFormInfo.company
    })
    const { o } = store.getters['order/getOrderInfo']
    await store.dispatch('order/submitPayMode')
    isLoading.value = false
    if (o) {
        // 確保有訂單號才跳轉
        router.push(`/order/${o}`)
    } else {
        console.error('訂單號不存在')
    }
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
const clearError = (fieldName) => {
    let fieldValue;
    switch (fieldName) {
        case 'name':
            fieldValue = formInfo.name;
            break;
        case 'phone':
            fieldValue = formInfo.phone;
            break;
        case 'address':
            fieldValue = formInfo.address;
            break;
        case 'email':
            fieldValue = invoiceFormInfo.email;
            break;
        default:
            return;
    }
    if (fieldValue.trim()) {
        formErrors[fieldName] = false;
    }
    debouncedSaveOrderForm({
        address: formInfo.address,
        name: formInfo.name,
        phone: formInfo.phone,
    })
}
onMounted(() => {
    // 從 store 獲取現有數據並初始化本地表單
    const orderStoreInfo = store.getters['order/getOrderFormInfo']
    if (orderStoreInfo) {
        formInfo.name = orderStoreInfo.name || ''
        formInfo.phone = orderStoreInfo.phone || ''
        formInfo.address = orderStoreInfo.address || ''
        formInfo.note = orderStoreInfo.note || ''
        formInfo.email = orderStoreInfo.email || ''
    }
    //獲取購物車商品
    store.dispatch('cart/fetchLatestCart')
    //當前進度
    store.dispatch('step/setCurrentStep', 2)
})
</script>
<template>
    <div>
        <div v-if="cartItems.length > 0" class="bg-white py-10 md:px-20 px-5">
            <!-- 進度條 -->
            <ProgressBar :steps />
            <!-- 購物車 -->
            <CartSummary :cartItems :shippingFee :totalPrice />
            <!-- 各種資料表單 -->
            <div class="w-full md:flex justify-between gap-10">
                <!-- 左部分 -->
                <div class="flex-1">
                    <!-- 送貨資料 -->
                    <div class=" w-full flex flex-col border mt-10  justify-center">
                        <div class="border w-full text-xl p-4 bg-gray-100 border-b flex items-center justify-between">
                            <span class="">送貨資料</span>
                            <span class="text-sm md:text-xl">運費: {{ shippingFee === '0' ? '免運費' :
                                `NT$${shippingFee}(滿$1000元免運費)`
                                }}</span>
                        </div>
                        <div class="flex flex-col gap-3 px-3">
                            <div class="flex flex-col">
                                <span>收件人名稱</span>
                            </div>
                            <div>
                                <input v-model="formInfo.name" @input="clearError('name')" type="text"
                                    :class="{ 'border-red-500 ': formErrors.name }"
                                    class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                                <span class="text-green-500 text-sm">*務必正確輸入購買人姓名確保正確送達</span>
                                <div class="h-5 ">
                                    <span v-if="formErrors.name" class="text-red-500 text-sm">{{ alertText
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 px-3">
                            <span>收件人電話號碼</span>
                            <div>
                                <input v-model="formInfo.phone" @input="clearError('phone')" type="text"
                                    :class="{ 'border-red-500 ': formErrors.phone }"
                                    class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                                <div class="h-5 mt-1">
                                    <span v-if="formErrors.phone" class="text-red-500 text-sm">{{ alertText
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 px-3">
                            <span>地址</span>
                            <div>
                                <input :disabled="isAddressDisabled" v-model="formInfo.address"
                                    @input="clearError('address')" type="text" placeholder="地址"
                                    :class="{ 'border-red-500 ': formErrors.address }"
                                    class="border border-gray-300 rounded px-3 placeholder:text-sm py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                                <div class="h-5 mt-1">
                                    <span v-if="formErrors.address" class="text-red-500 text-sm">{{ alertText
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 訂單備注 -->
                    <div class=" w-full flex flex-col border mt-10  justify-center">
                        <h2 class="border w-full text-xl p-4 bg-gray-100 border-b">訂單備註</h2>
                        <div class="w-full p-3">
                            <textarea placeholder="有什麽想告訴賣家的嗎？" v-model="formInfo.note"
                                class="w-full border p-1 h-24 placeholder:text-sm focus:outline-none"></textarea>
                        </div>
                    </div>
                </div>

                <!-- 右部分 -->
                <div class="flex-1">
                    <!-- 索取發票 -->
                    <div class=" w-full flex flex-col border mt-10  justify-center">
                        <div class="border w-full text-xl p-4 bg-gray-100 border-b flex justify-between">
                            <span class="">索取發票</span>
                        </div>
                        <div class="p-3 space-y-1">
                            <span class="mb-3">發票類型</span>
                            <Select :selects="invoiceTypes" :isOrder="true"
                                @update:selected="getCurrentInvoiceType"></Select>
                        </div>
                        <div v-if="InvoiceType === '愛心捐贈'" class="p-3 space-y-1">
                            <div class="flex flex-col mb-3">
                                <span>郵箱（選填）</span>
                                <span class="text-green-500 text-sm">*我們會將您的訂單通知信寄送至此。</span>
                            </div>
                            <input v-model="invoiceFormInfo.email" type="text" placeholder="ex: example@gmail.com"
                                class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                        </div>
                        <div v-else-if="InvoiceType === '寄送至郵箱'" class="">
                            <div class="p-3 space-y-1">
                                <span class="mb-3">收貨人名字</span>
                                <input type="text" v-model="invoiceFormInfo.name"
                                    class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                            </div>
                            <div class="p-3 space-y-1">
                                <span class="mb-3">統一編號（選填）</span>
                                <input type="text" v-model="invoiceFormInfo.identifier"
                                    class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                            </div>
                            <div class="p-3 space-y-1">
                                <span class="mb-3">郵箱（必填）</span>
                                <div>
                                    <input v-model="invoiceFormInfo.email" type="text"
                                        placeholder="ex: example@gmail.com"
                                        :class="{ 'border-red-500 ': formErrors.email }"
                                        class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                                    <div class="h-5 ">
                                        <span v-if="formErrors.email" class="text-red-500 text-sm">{{ alertText
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="w-full border flex py-10 px-5">
                <NuxtLink to="/cart" class="text-blue-400 flex-1 flex items-center w-fit">
                    < 返回購物車 </NuxtLink>
                        <div @click="submitOrder"
                            class="bg-[#ac886b] cursor-pointer text-center flex-1 py-2 text-white rounded-sm w-full h-[40px]">
                            <div class=" w-full flex justify-center" v-if="isLoading">
                                <svg class="animate-spin h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4">
                                    </circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </div>
                            <span v-else>提交訂單</span>

                        </div>
            </div>

        </div>
        <div v-else class="flex items-center justify-center h-screen">
            <span class="text-gray-500 text-xl">購物車内沒有商品</span>
        </div>
    </div>
</template>