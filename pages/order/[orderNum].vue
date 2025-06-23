<script setup>
import { useStore } from 'vuex'
import { getOrderDetailApi, getPaymentReturnUrlApi, sendNotificationApi } from '~/api/order-api'
const store = useStore()
const route = useRoute()
// 對應文件名 [orderNum].vue
const orderNum = route.params.orderNum
const steps = [
    { label: '購物車', number: 1 },
    { label: '填寫資料', number: 2 },
    { label: '訂單確認', number: 3 }
]
const cartItems = ref([])
const shippingFee = ref("0")
const totalPrice = ref("0")
const order = reactive({
    orderNum: '',
    createDate: ''
})
const currentOrderStatus = ref('訂單處理中')
const paymentObj = ref({})
const isShowPayment = ref(false)
// //判斷是否為創建訂單的頁面 （只有為創建訂單頁面，submitPayment【pay-mode】提交支付方式api才能執行）
// const isCreateOrder = ref(false)
const receiver = ref({
    name: '',
    email: '',
    phone: '',
    address: ''
})
const payment = ref({
    pay_name: '',
    status_name: ''
})

const orderInfo = computed(() => store.getters['order/getOrderInfo'] || {})
const getOrderDetail = async () => {
    const { data } = await getOrderDetailApi(orderNum)
    cartItems.value = data[0].item.length > 1 ? data[0].item.slice(0, -1) : []
    totalPrice.value = data[0].total
    shippingFee.value = data[0].item[data[0].item.length - 1].price
    order.orderNum = data[0].order.order_num
    order.createDate = data[0].order.created_at
    receiver.value = data[0].receiver
    payment.value.status_name = data[0].payment.status_name
    // 訂單狀態
    currentOrderStatus.value = getStatusName(data[0].progress)
}
const getSelectedPayment = async () => {
    const res = await getPaymentReturnUrlApi({
        order_num: orderInfo.value.o,
        redirect_f2e_href: window.location.href
    })
    paymentObj.value = res
    payment.value.pay_name = res.pay_name
}
//給用戶發送消息
const sendNotification = async () => {
    await sendNotificationApi({
        key: 'web_vue_order',
        message: '下单成功'
    })
}
const getStatusName = (progressData) => {
    const status = progressData.status
    const statusName = progressData.status_name
    // 找到值為 true 的狀態鍵
    const currentStatusKey = Object.keys(status).find(key => status[key] === true)
    // 獲取對應的中文名稱
    if (currentStatusKey && statusName[currentStatusKey]) {
        return statusName[currentStatusKey]
    }
    return '訂單處理中' // 找不到時的默認值
}
const checkPaymentWay = (paymentMethod) => {
    switch (paymentMethod) {
        case 'ReceivedPay':
            return false
            break
        case 'CreditCard':
            return true
        case 'ATMTransfer':
            return true
        default:
            return false
    }
}
//提交支付表單
const submitPayment = () => {
    // 創建表單元素
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = paymentObj.value.furl
    form.style.display = 'none'

    // 添加所有表單字段
    Object.entries(paymentObj.value.data_list).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
    })

    // 添加到頁面並提交
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
}

onMounted(async () => {
    try {
        // 提交支付方式
        // await store.dispatch('order/submitPayMode')
    } catch (error) {
        console.error(error)
    } finally {
        //獲取付款方式
        await getSelectedPayment()
        //獲取訂單詳情
        await getOrderDetail()
        // 提交發票
        await store.dispatch('order/submitInvoice')
        //更新購物車
        await store.dispatch('cart/fetchLatestCart')
        //發送通知
        await sendNotification()
        store.dispatch('step/setCurrentStep', 3)
    }
})

</script>
<template>
    <div class="bg-white py-10 md:px-20 px-5 w-full">
        <!-- 進度條 -->
        <ProgressBar :steps />
        <!-- 購物車 -->
        <CartSummary :cartItems :shippingFee :totalPrice />
        <div class="w-full flex flex-col border py-10 px-3 mt-10  justify-center ">
            <div class="flex flex-col items-center justify-center ">
                <!-- 成功提示 -->
                <div class="pb-10 flex items-center justify-center gap-6">
                    <svg width="88" height="93" viewBox="0 0 88 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="44" cy="46.5" r="40" fill="white" stroke="green" stroke-width="8" />
                        <path d="M30 46L41 57L58 36" stroke="#007A33" stroke-width="6" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <div class="flex flex-col gap-5">
                        <div>
                            <h2 class="text-xl font-bold">謝謝您！您的訂單已經成立！</h2>
                            <span>訂單號碼 {{ order.orderNum }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span>訂單確認電郵已經發送到您的電子郵箱</span>
                        </div>
                    </div>
                </div>
                <div v-if="checkPaymentWay(paymentObj.mode)"
                    class="bg-green-600 flex items-center 
                      p-3 md:px-10 rounded-md text-white cursor-pointer hover:bg-green-700 transition-colors duration-300">
                       <!-- 支付圖標 SVG -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    <button @click="submitPayment">
                        前往支付
                    </button>
                </div>
            </div>
            <!-- 付費資訊 -->
            <div class="flex flex-col gap-6">
                <!-- 訂單咨詢 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-800 leading-relaxed">
                    <!-- 左欄 -->
                    <div class="space-y-6 md:col-span-2">
                        <!-- 訂單資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">訂單資訊</h3>
                            <div class="grid grid-cols-[100px_1fr] gap-y-1">
                                <span class="text-gray-600">訂單日期:</span>
                                <span>{{ order.createDate }}</span>
                                <span class="text-gray-600">訂單狀態:</span>
                                <span>{{ currentOrderStatus }}</span>
                            </div>
                        </div>
                        <!-- 送貨資訊 -->
                        <div >
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">送貨資訊</h3>
                            <div class="grid grid-cols-[100px_1fr] gap-y-1 text-gray-600">
                                <span >收件人名稱:</span>
                                <span>{{ receiver.name }}</span>
                                <span >收件人電話:</span>
                                <span>{{ receiver.phone }}</span>

                                <span >出貨狀態:</span>
                                <span>{{ currentOrderStatus }}</span>
                                <span >送貨方式簡介:</span>
                                <span >下單後3個工作天內出貨，出貨後5-14個工作天內到貨</span>
                                <span >收件地址:</span>
                                <span class="">{{ receiver.address }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 右欄 -->
                    <div class="space-y-6">
                        <!-- 顧客資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">購買人資訊</h3>
                            <div class="grid grid-cols-[80px_1fr] gap-y-1">
                                <span class="text-gray-600">名稱:</span>
                                <span>{{ receiver.name }}</span>
                                <span class="text-gray-600">電話號碼:</span>
                                <span>{{ receiver.phone }}</span>
                                <span class="text-gray-600">客戶備注:</span>
                                <span>{{ receiver.note }}</span>
                            </div>
                        </div>
                        <!-- 付款資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">付款資訊</h3>
                            <div class="grid grid-cols-[100px_1fr] gap-y-1">
                                <span class="text-gray-600">付款方式:</span>
                                <span>{{ payment.pay_name }}</span>
                                <span class="text-gray-600">付款狀態:</span>
                                <span>{{ payment.status_name }}</span>
                                <!-- <span class="text-gray-600">發票狀態:</span>
                                <span>處理中</span>
                                <span class="text-gray-600">發票申請類型:</span>
                                <span>雲端發票</span>
                                <span class="text-gray-600">發票載具類型:</span>
                                <span>會員載具 (12132@qq.com)</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-3 text-white mt-12">
            <NuxtLink
                class="block  p-3 bg-[#ac886b] text-center hover:bg-[#cc9f7b] hover:text-white transition-all duration-300"
                to="/check_order">
                查詢訂單
            </NuxtLink>
            <NuxtLink
                class="block text-black  p-3 bg-gray-500/20 text-center hover:text-white hover:bg-gray-600 transition-all duration-300"
                to="/">
                繼續購物
            </NuxtLink>
        </div>
    </div>
</template>
