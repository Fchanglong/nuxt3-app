<script setup>
// import { useStepStore } from '~/stores/index.js'
// const store = useStepStore()
import { useStore } from 'vuex'
const store = useStore()
const steps = [
    { label: '購物車', number: 1 },
    { label: '填寫資料', number: 2 },
    { label: '訂單確認', number: 3 }
]
const cartItems = ref([
    {
        id: 1,
        name: '替換布套 (Joy Pro 智慧按摩椅墊 適用)',
        color: '銀河灰',
        price: 880,
        originalPrice: 1080,
        quantity: 1,
        image: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/800x.webp?source_format=png'
    }
])
const bankInfo = ref({
    bankCode: 812,
    bankAccount: 9736061163416438
})
const isCopyed = ref(false)
const pasteHandle = async () => {
    try {
        await navigator.clipboard.writeText(bankInfo.value.bankAccount.toString())
        isCopyed.value = true
        setTimeout(() => {
            isCopyed.value = false
        }, 5000)
    } catch (err) {
        console.error('複製失敗:', err)
        alert('複製失敗，請手動複製')
    }
}
onMounted(() => {
    store.dispatch('step/setCurrentStep', 3)
})
</script>
<template>
    <div class="bg-white py-10 md:px-20 px-5 w-full">
        <!-- 進度條 -->
        <ProgressBar :steps />
        <!-- 購物車 -->
        <CartSummary :cartItems />
        <div class="w-full flex flex-col border py-10 px-3 mt-10  justify-center ">
            <!-- 成功提示 -->
            <div class="py-10 flex items-center justify-center gap-6">
                <svg width="88" height="93" viewBox="0 0 88 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="44" cy="46.5" r="40" fill="white" stroke="green" stroke-width="8" />
                    <path d="M30 46L41 57L58 36" stroke="#007A33" stroke-width="6" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <div class="flex flex-col gap-5">
                    <div>
                        <h2 class="text-xl font-bold">謝謝您！您的訂單已經成立！</h2>
                        <span>訂單號碼 20250611010330314</span>
                    </div>
                    <div class="flex flex-col">
                        <span>訂單確認電郵已經發送到您的電子郵箱:</span>
                        <span class="font-semibold">12****@qq.com</span>
                    </div>
                </div>
            </div>
            <!-- 付費資訊 -->
            <div class="flex flex-col gap-6">
                <div class="flex gap-3 items-center">
                    <h2 class="text-xl font-bold">付費咨詢</h2>
                    <span class="text-sm text-gray-600"> (建議您複製帳號或使用手機截圖保存轉帳帳號，並於期限前付款)</span>
                </div>
                <div class="border w-full">
                    <div class="flex gap-4 p-4 bg-orange-300/20 border-b">
                        <div>
                            <div class="flex gap-4">
                                <span class="w-28">銀行代碼:</span>
                                <span class="font-semibold text-left">{{ bankInfo.bankCode }}</span>
                            </div>
                            <div class="flex gap-4">
                                <span class="w-28">銀行轉帳帳號:</span>
                                <span class="font-semibold text-left">{{ bankInfo.bankAccount }}</span>
                            </div>
                        </div>
                        <button @click="pasteHandle" class="px-3  bg-orange-400 rounded-sm text-sm">複製賬號</button>
                        <span v-if="isCopyed" class="text-orange-400 text-sm mt-auto">✅已複製</span>
                    </div>
                    <div class="flex gap-4 p-4">
                        <div>
                            <div class="flex gap-4">
                                <span class="w-28">繳款金額:</span>
                                <span class="font-semibold text-left">{{ bankInfo.bankCode }}</span>
                            </div>
                            <div class="flex gap-4">
                                <span class="w-28">繳費期限:</span>
                                <span class="font-semibold text-left">{{ bankInfo.bankAccount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 注意事項 -->
                <div class="flex flex-col gap-3 text-sm">
                    <span>注意事項:</span>
                    <div class="flex flex-col">
                        <span>1. 此轉帳帳號僅提供此次交易及指定繳款金額使用，逾期無效，請重新下單。</span>
                        <span>2. 若使用 ATM 櫃員機，可選擇轉帳/轉出 (繳費單筆上限 3 萬元) 或繳費 (無上限 3 萬元限制) 之功能按鈕。金融卡繳費上限依各發卡行規定辦理。不支援 ATM
                            櫃員機無卡存款功能及銀行臨櫃繳費 (含無摺存款)。</span>
                    </div>
                    <span>請留意慎防 ATM 詐騙，除提供您轉帳資訊，不會要求您至提款機操作任何功能，若有不明人士來信或來電，應立即撥打 165 防詐騙專線查詢或透過客服專線查證。</span>
                </div>
                <!-- 訂單明細 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-800 leading-relaxed">
                    <!-- 左欄 -->
                    <div class="space-y-6 md:col-span-2">
                        <!-- 訂單資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">訂單資訊</h3>
                            <div class="grid grid-cols-[100px_1fr] gap-y-1">
                                <span class="text-gray-600">訂單日期:</span>
                                <span>2025-06-11 09:03AM</span>
                                <span class="text-gray-600">訂單狀態:</span>
                                <span>訂單處理中</span>
                            </div>
                        </div>
                        <!-- 送貨資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">送貨資訊</h3>
                            <div class="grid grid-cols-[100px_1fr] gap-y-1">
                                <span class="text-gray-600">收件人名稱:</span>
                                <span>1231</span>
                                <span class="text-gray-600">收件人電話號碼:</span>
                                <span>+15674***117</span>
                                <span class="text-gray-600">送貨方式:</span>
                                <span>順豐快遞(台灣出貨香港)</span>
                                <span class="text-gray-600">送貨狀態:</span>
                                <span>備貨中</span>
                                <span class="text-gray-600">送貨方式簡介:</span>
                                <span>下單後3個工作天內出貨，出貨後5-14個工作天內到貨</span>
                                <span class="text-gray-600">地址:</span>
                                <span class="">香港香港島灣仔區灣仔12312asd</span>
                            </div>
                        </div>
                    </div>
                    <!-- 右欄 -->
                    <div class="space-y-6">
                        <!-- 顧客資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">顧客資訊</h3>
                            <div class="grid grid-cols-[80px_1fr] gap-y-1">
                                <span class="text-gray-600">名稱:</span>
                                <span>1231</span>
                                <span class="text-gray-600">電話號碼:</span>
                                <span>15674***117</span>
                            </div>
                        </div>
                        <!-- 付款資訊 -->
                        <div>
                            <h3 class="font-bold text-xl border-b pb-1 mb-2">付款資訊</h3>
                            <div class="grid grid-cols-[100px_1fr] gap-y-1">
                                <span class="text-gray-600">付款方式:</span>
                                <span>銀行轉帳</span>
                                <span class="text-gray-600">付款狀態:</span>
                                <span>未付款</span>
                                <span class="text-gray-600">發票狀態:</span>
                                <span>處理中</span>
                                <span class="text-gray-600">發票申請類型:</span>
                                <span>雲端發票</span>
                                <span class="text-gray-600">發票載具類型:</span>
                                <span>會員載具 (12132@qq.com)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NuxtLink class="block  p-3 bg-gray-500/20 text-center hover:bg-gray-600 hover:text-white transition-all duration-300" to="/">
            繼續購物
        </NuxtLink>
    </div>
</template>
