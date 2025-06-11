<script setup>
import { useStepStore } from '~/stores/index.js'
const store = useStepStore()

const router = useRouter()
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

const removeItem = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)

}
// 增加數量
const changeQuantity = (item, type) => {
    if (type === 'add') {
        item.quantity++
    } else if (type === 'reduce' && item.quantity > 1) {
        item.quantity--
    }
}
const selectsDeliver = ref([
    { id: 1, name: '順豐快遞(台灣出貨香港)', value: '' },
])
const updateSelectsDeliver = (option) => {
    console.log(option.name);
}
const selectsPay = ref([
    { id: 1, name: '信用卡一次付款', value: '' },
])
const updateSelectsPay = (option) => {
    console.log(option.name);
}
const toCheckouyHandle = () => {
    router.push('/checkout')
}
onMounted(() => {
    store.setCurrentStep(1)
})
</script>

<template>
    <div class="bg-white py-10 md:px-20 px-5">
        <!-- 進度條 -->
        <ProgressBar :steps />
        <!-- 購物車表格 -->
        <div class="w-full mx-auto  border rounded  mt-14">
            <div class="h-16 flex items-center px-4 text-xl bg-gray-100">購物車 ({{ cartItems.length }} 件)</div>
            <div class=" border rounded overflow-hidden ">
                <!-- 表頭 -->
                <div class="hidden md:grid grid-cols-7 font-bold  text-center py-3">
                    <div class="col-span-2 text-start ml-4">商品資料</div>
                    <div>優惠</div>
                    <div>單件價格</div>
                    <div>數量</div>
                    <div>小計</div>
                </div>
                <!-- 内容 -->
                <div v-for="item in cartItems" :key="item.id"
                    class=" md:grid grid-cols-7 items-center text-center border-t py-3">
                    <div class="col-span-2 flex items-center gap-4 pl-4">
                        <img :src="item.image" alt="" class="w-16 h-16 object-cover" />
                        <div class="text-left">
                            <div class="">{{ item.name }}</div>
                            <div class="text-gray-500 text-sm">{{ item.color }}</div>
                        </div>
                    </div>
                    <div class="hidden md:block">-</div>
                    <div>
                        <div class="font-bold">NT${{ item.price }}</div>
                        <div class="text-gray-400 line-through text-sm">NT${{ item.originalPrice }}</div>
                    </div>
                    <div>
                        <div class="inline-flex items-center border rounded box-border">
                            <button @click="changeQuantity(item, 'reduce')" class="px-2 w-8 border ">-</button>
                            <span class="px-3">{{ item.quantity }}</span>
                            <button @click="changeQuantity(item, 'add')" class="px-2 w-8 border">+</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <span class="font-bold">NT${{ item.price * item.quantity }}</span>

                    </div>
                    <div>
                        <button @click="removeItem(item.id)"
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
                        <span>送貨地點</span>
                        <input type="text"
                            class="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                    </div>
                    <div>
                        <span>送貨方式</span>
                        <Select :selects="selectsDeliver" @update:selected="updateSelectsDeliver" />
                        <span class="text-gray-500 text-sm">下單後3個工作天內出貨，出貨後5-14個工作天內到貨</span>
                    </div>
                    <div>
                        <span>付款方式</span>
                        <Select :selects="selectsPay" @update:selected="updateSelectsPay" />
                        <span class="text-gray-500 text-sm">下單後3個工作天內出貨，出貨後5-14個工作天內到貨</span>
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
                            <span>NT$880</span>
                        </div>
                        <div class="flex justify-between">
                            <span>運費:</span>
                            <span>NT$880</span>
                        </div>
                        <hr />
                    </div>
                    <!-- 下半部 -->
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="font-bold">合計:</span>
                            <span>NT$880</span>
                        </div>
                        <button @click="toCheckouyHandle"
                            class="w-full  bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-md transition-colors duration-300">
                            前往結賬
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
