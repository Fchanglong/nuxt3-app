<script setup>
import { useStepStore } from '~/stores/stepStore'
const store = useStepStore()
const route = useRoute()
const steps = [
    { label: '購物車', number: 1 },
    { label: '填寫資料', number: 2 },
    { label: '訂單確認', number: 3 }
]
const isOpen = ref(false)
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
const cartRef = ref(null)
const toggleCart = () => {
    const el = cartRef.value
    if (!el) return
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        el.style.maxHeight = el.scrollHeight + 'px'
        el.style.opacity = '1'
    } else {
        el.style.maxHeight = '0'
        el.style.opacity = '0'
    }
}

onMounted(() => {
    store.setCurrentStep(2)
})
</script>
<template>
    <div class="bg-white py-10 md:px-20 px-5">
        <!-- 進度條 -->
        <progressBar :steps />
        <div class="w-full border py-5 mt-10 overflow-hidden">
            <div class="flex flex-col items-center  text-xl ">
                <h2 class=" font-bold">合計: NT$2,680</h2>
                <div @click="toggleCart" class="flex items-center gap-3 cursor-pointer">
                    <h2>購物車({{ cartItems.length }})</h2>
                    <span>
                        <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            <!-- 購物車 -->
            <div ref="cartRef" class="transition-all duration-300 ease-in-out  max-h-0 opacity-0">
                <div class="w-full mx-auto  border rounded  mt-14">
                    <div class="  rounded overflow-hidden ">
                        <!-- 表頭 -->
                        <div class="grid grid-cols-6 font-bold  text-center py-3">
                            <div class="col-span-2 text-start ml-4">商品資料</div>
                            <div>優惠</div>
                            <div>單件價格</div>
                            <div>數量</div>
                            <div>小計</div>
                        </div>
                        <!-- 内容 -->
                        <div v-for="item in cartItems" :key="item.id"
                            class="grid grid-cols-6 items-center text-center border-t py-3">
                            <div class="col-span-2 flex items-center gap-4 pl-4">
                                <img :src="item.image" alt="" class="w-16 h-16 object-cover" />
                                <div class="text-left">
                                    <div class="">{{ item.name }}</div>
                                    <div class="text-gray-500 text-sm">{{ item.color }}</div>
                                </div>
                            </div>
                            <div>-</div>
                            <div>
                                <div class="font-bold">NT${{ item.price }}</div>
                                <div class="text-gray-400 line-through text-sm">NT${{ item.originalPrice }}</div>
                            </div>
                            <div>
                                <div class="inline-flex items-center border rounded box-border">
                                    <span class="px-3">{{ item.quantity }}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-center gap-2">
                                <span class="font-bold">NT${{ item.price * item.quantity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 統計 -->
                <div class="md:w-[730px] ml-auto mr-10 mt-10">
                    <div class="flex justify-between">
                        <span>小計:</span>
                        <span>NT$880</span>
                    </div>
                    <div class="flex justify-between">
                        <span>運費:</span>
                        <span>NT$880</span>
                    </div>
                    <div class="flex justify-between font-bold">
                        <span>合計:</span>
                        <span>NT$880</span>
                    </div>
                </div>
            </div>
        </div>
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
           <NuxtLink to="/cart" class="text-blue-400 flex-1 flex items-center ">< 返回購物車</NuxtLink>
           <button class="bg-[#ac886b] flex-1 py-2 text-white rounded-sm w-full">提交訂單</button>
        </div>
    </div>
</template>