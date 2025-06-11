<script setup>
const props = defineProps({
    cartItems: {
        type: Array,
        require: true
    }
})
const isOpen = ref(false)
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
</script>
<template>
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
</template>