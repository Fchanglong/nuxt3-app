<script setup>
import { useStepStore } from '~/stores/index.js'
const store = useStepStore()
const route = useRoute()
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

onMounted(() => {
    store.setCurrentStep(2)
})
</script>
<template>
    <div class="bg-white py-10 md:px-20 px-5">
        <!-- 進度條 -->
        <ProgressBar :steps />
        <!-- 購物車 -->
        <CartSummary :cartItems />
        <!-- 各種資料表單 -->
        <div class="w-full md:flex justify-between gap-10">
            <!-- 左部分 -->
            <div class="flex-1">
                <!-- 顧客資料 -->
                <div class=" w-full flex flex-col border mt-10  justify-center">
                    <h2 class="border w-full text-xl p-4 bg-gray-100 border-b">顧客資料</h2>
                    <div class="flex flex-col gap-3 p-3">
                        <span>顧客名稱</span>
                        <input type="text"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                    <div class="flex flex-col gap-3 p-3">
                        <span>電子信箱</span>
                        <input type="text"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                    <div class="flex flex-col gap-3 p-3">
                        <span>電話號碼</span>
                        <input type="text"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                </div>
                <!-- 訂單備注 -->
                <div class=" w-full flex flex-col border mt-10  justify-center">
                    <h2 class="border w-full text-xl p-4 bg-gray-100 border-b">訂單備註</h2>
                    <div class="w-full p-3">
                        <textarea placeholder="有什麽想告訴賣家的嗎？"
                            class="w-full border p-1 h-24 placeholder:text-sm focus:outline-none"></textarea>
                    </div>
                </div>
            </div>

            <!-- 右部分 -->
            <div class="flex-1">
                <!-- 送貨資料 -->
                <div class=" w-full flex flex-col border mt-10  justify-center">
                    <div class="border w-full text-xl p-4 bg-gray-100 border-b flex justify-between">
                        <span class="">送貨資料</span>
                        <span class="">運費: NT$1,800</span>
                    </div>
                    <div class="flex flex-col gap-3 p-3">
                        <span>收件人名稱</span>
                        <input type="text"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                        <span class="text-sm text-gray-400">請填入收件人真實姓名，以確保順利收件</span>
                    </div>
                    <div class="flex flex-col gap-3 p-3">
                        <span>收件人電話號碼</span>
                        <input type="text"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                    <div class="flex flex-col gap-3 p-3">
                        <span>地址</span>
                        <input type="text" placeholder="地址"
                            class="border border-gray-300 rounded px-3 placeholder:text-sm py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                </div>
                <!-- 付款資料 -->
                <div class=" w-full flex flex-col border mt-10  justify-center">
                    <div class="border w-full text-xl p-4 bg-gray-100 border-b flex justify-between">
                        <span class="">付款資料</span>
                        <span class="">合計: NT$2,680</span>
                    </div>
                    <div class="text-sm p-3">已選擇的付款方式: 信用卡一次付款</div>
                    <div class="p-3">
                        <input type="text" placeholder="卡號"
                            class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                    <div class="p-3">
                        <input type="text" placeholder="持卡人姓名"
                            class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                </div>

            </div>
        </div>
        <div class="w-full border flex py-10 px-5">
            <NuxtLink to="/cart" class="text-blue-400 flex-1 flex items-center ">
                < 返回購物車 </NuxtLink>
                    <NuxtLink to="/order" class="bg-[#ac886b] text-center flex-1 py-2 text-white rounded-sm w-full">
                        提交訂單
                    </NuxtLink>
        </div>
    </div>
</template>