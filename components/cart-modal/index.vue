<script setup>
import { useCartStore } from '~/stores/index'
const cartStore = useCartStore()
const cartModal = ref(null)
const isToggleClick = ref(false)  // 新增：記錄是否是切換按鈕的點擊

// 監聽商店的切換事件
watch(() => cartStore.isCartModalOpen, (isOpen) => {
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
        cartStore.isCartModalOpen = false
    }
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
        <div v-if="cartStore.isCartModalOpen" class="fixed inset-0  bg-opacity-50 z-[1000]"
            @click="cartStore.isCartModalOpen = false">
        </div>
        <!-- 購物車模態框 -->
        <Transition name="slide">
            <div ref="cartModal" class="w-[360px]  bg-[#191919] fixed right-0 top-5 p-3 z-[1001]"
                v-if="cartStore.isCartModalOpen">
                <ul v-if="cartStore.items.length" class="space-y-3 min-h-[150px]">
                    <li v-for="item in cartStore.items" :key="item.id">
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
                            <div class="text-white cursor-pointer" @click.stop="cartStore.removeFromCart(item.id)">
                                &times;
                            </div>
                        </div>
                    </li>
                    <NuxtLink to="/cart"
                        class="block text-center w-full py-2 mt-4 text-white bg-[#ac886b] rounded hover:bg-white/80 transition-colors hover:text-black">
                        前往結帳
                    </NuxtLink>
                </ul>
                <div v-else class="text-white h-[150px] flex items-center justify-center py-4">
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
