<script setup>
const props = defineProps({
    cartItems: {
        type: Array,
        require: true
    },
    shippingFee: {
        type: String,
        default: '0'
    },
    totalPrice: {
        type: String,
        default: '0'
    }
})
const isOpen = ref(false)
const cartRef = ref(null)
// 計算小計
const subtotal = computed(() => {
    return props.cartItems.reduce((sum, item) => {
        // 處理帶逗號的字符串
        const cleanTotal = typeof item.total === 'string' ? item.total.replace(/,/g, '') : item.total
        return sum + (parseFloat(cleanTotal) || 0)
    }, 0)
})
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
            <h2 class=" font-bold">合計: {{ totalPrice }}</h2>
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
                <div class="rounded overflow-hidden ">
                    <!-- 表頭 -->
                    <div class="hidden md:grid grid-cols-6 font-bold  text-center py-3">
                        <div class="col-span-2 text-start ml-4">商品資料</div>
                        <div>規格</div>
                        <div>單件價格</div>
                        <div>數量</div>
                        <div>小計</div>
                    </div>
                    <!-- 内容 -->
                    <div v-for="item in cartItems" :key="item.item_id" class="border-t py-4">
                        <!-- 桌面端：grid 布局 -->
                        <div class="hidden md:grid grid-cols-6 items-center text-center">
                            <div class="col-span-2 flex items-center gap-4 pl-4">
                                <img :src="item.display_img_small" alt="" class="w-16 h-16 object-cover" />
                                <div class="text-left">
                                    <div class="">{{ item.form_name }}</div>
                                </div>
                            </div>
                            <div class="flex flex-col text-sm text-gray-500">
                                <span v-for="(spec, index) in item.sub" :key="index" :class="{
                                    'text-red-500': spec.sub_type === 'SFREE'
                                }">
                                    {{ spec.sub_type === 'SFREE' ? '贈品:' : '' }}{{ spec.form_name }}&times;{{ spec.num
                                    }}
                                </span>
                            </div>
                            <div>
                                <span class="font-bold">NT${{ item.price }}</span>
                            </div>
                            <div>
                                <span class="px-3">{{ item.num }}</span>
                            </div>
                            <div class="flex items-center justify-center">
                                <span class="font-bold  ">NT${{ item.total }}</span>
                            </div>
                        </div>

                        <!-- 移動端：卡片式布局 -->
                        <div class="md:hidden">
                            <!-- 商品信息行 -->
                            <div class="flex items-start gap-3 mb-3 pl-2">
                                <img :src="item.display_img_small" alt="" class="w-16 h-16 object-cover rounded" />
                                <div class="flex-1">
                                    <div class="font-medium mb-1">{{ item.form_name }}</div>
                                    <div class="text-sm text-gray-500 space-y-1">
                                        <div v-for="(spec, index) in item.sub" :key="index" :class="{
                                            'text-red-500': spec.sub_type === 'SFREE'
                                        }">
                                            {{ spec.sub_type === 'SFREE' ? '贈品:' : '' }}{{ spec.form_name }}&times;{{
                                            spec.num }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 價格和數量信息行 -->
                            <div class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                <div class="flex items-center gap-4">
                                    <div class="text-center">
                                        <div class="text-xs text-gray-500 mb-1">單價</div>
                                        <div class="font-semibold text-sm">NT${{ item.price }}</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-xs text-gray-500 mb-1">數量</div>
                                        <div class="font-semibold text-sm">{{ item.num }}</div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs text-gray-500 mb-1">小計</div>
                                    <div class="font-bold text-lg text-green-600">NT${{ item.total }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 統計 -->
            <div class="md:w-[730px] ml-auto md:mr-10 md:p-3  px-3 ">
                <div class="flex justify-between">
                    <span>小計:</span>
                    <span>NT${{ subtotal }}</span>
                </div>
                <div class="flex justify-between">
                    <span>運費:</span>
                    <span :class="{ 'text-red-500': shippingFee === '0' }">
                        {{ shippingFee === '0' ? '免運費(滿$1000元免運費)' : `NT$${shippingFee}` }}
                    </span>
                </div>
                <div class="flex justify-between font-bold">
                    <span>合計:</span>
                    <span class="text-xl text-green-600">NT${{ totalPrice }}</span>
                </div>
            </div>
        </div>
    </div>
</template>