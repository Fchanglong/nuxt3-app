<script setup>
import { useStore } from 'vuex'
const store = useStore()
const cartModal = ref(null)
const isToggleClick = ref(false)  // 新增：記錄是否是切換按鈕的點擊
// 使用 computed 從 Vuex 獲取購物車狀態
const isCartModalOpen = computed(() => store.getters['cart/isModalOpen'])
const cartItems = computed(() => store.getters['cart/getItems'])

// 監聽商店的切換事件
watch(() => isCartModalOpen.value, (isOpen) => {
    if (isOpen) {
        // 模態框剛被打開，標記為切換操作
        isToggleClick.value = true
        setTimeout(() => {
            isToggleClick.value = false
        }, 0)
        // 禁止滾動
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
        // 模態框關閉，恢復滾動
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
})

const handleClickOutside = (event) => {
    // 如果是通過按鈕切換打開的，忽略這次點擊
    if (isToggleClick.value) {
        return
    }

    if (cartModal.value && !cartModal.value.contains(event.target)) {
        store.dispatch('cart/hideCartModal')
    }
}

// 移除商品
const removeFromCart = (itemId) => {
    store.dispatch('cart/removeFromCart', itemId)
}

// 關閉模態框
const closeModal = () => {
    store.dispatch('cart/hideCartModal')
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div>
        <!-- 遮罩 -->
        <div v-if="isCartModalOpen" class="fixed inset-0  bg-opacity-50 z-[1000]"
            @click="closeModal">
        </div>
        <!-- 購物車模態框 -->
        <Transition name="slide">
            <div ref="cartModal"
                class="w-[360px] h-full md:h-fit bg-[#191919] fixed right-0 top-0 md:top-5 px-3 py-6 z-[1001] overflow-y-auto"
                v-if="isCartModalOpen">
                <ul v-if="cartItems.length" class=" space-y-3  md:min-h-[150px]">
                    <li v-for="item in cartItems" :key="item.id">
                        <div class="flex gap-3 items-start justify-between">
                            <img class="w-[88px] h-[88px] object-cover" :src="item.image" alt="">
                            <div class="flex flex-col flex-1">
                                <h2 class=" font-bold text-gray-600">{{ item.name }}</h2>
                                <span class="text-white font-semibold text-sm" v-if="item.selectedColor">
                                    {{ item.selectedColor }}
                                </span>
                                <span class="text-white font-semibold ">
                                    {{ item.quantity }} &times; HK$ {{ item.cuurentPrice }}
                                </span>
                            </div>
                            <div class="text-white cursor-pointer" @click.stop="removeFromCart(item.id)">
                                &times;
                            </div>
                        </div>
                    </li>
                    <div class="h-16 py-2 w-full flex justify-center">
                        <NuxtLink to="/cart" class="flex-1 py-2 flex items-center justify-center
                       text-white bg-[#ac886b] rounded hover:bg-white/80 transition-colors hover:text-black">
                            前往結帳
                        </NuxtLink>
                    </div>
                </ul>
                <div v-else class="text-white h-full md:h-[150px] flex items-center justify-center py-4">
                    購物車是空的
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* 滑入效果 */
.slide-enter-active {
    transition: all 0.3s ease-out;
}

.slide-leave-active {
    transition: all 0.2s ease-in;
}

.slide-leave-to,
.slide-enter-from {
    transform: translateX(100%);
}

.slide-leave-from,
.slide-enter-to {
    transform: translateX(0);
}
</style>