<script setup>
const props = defineProps({
  originalImages: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 建立含 clone 的新陣列
const displayImages = [
    props.originalImages[props.originalImages.length - 1], // clone最後一張
    ...props.originalImages,
    props.originalImages[0], // 克隆第一張
]

const currentIndex = ref(1) // 初始從真正第一張開始
const enableTransition = ref(true)
const isTransitioning = ref(false)

// 真正圖片索引（排除 clone）
const realIndex = computed(() => {
    if (currentIndex.value === 0) return props.originalImages.length - 1
    if (currentIndex.value === displayImages.length - 1) return 0
    return currentIndex.value - 1
})

// 點擊圓點跳轉
const goToSlide = (index) => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    enableTransition.value = true
    currentIndex.value = index + 1
}

// 過渡結束後做無縫跳轉
const handleTransitionEnd = () => {
    isTransitioning.value = false

    // 跳回真正第一張
    if (currentIndex.value === displayImages.length - 1) {
        enableTransition.value = false
        currentIndex.value = 1
    }

    // 跳回真正最後一張
    if (currentIndex.value === 0) {
        enableTransition.value = false
        currentIndex.value = displayImages.length - 2
    }
}

onMounted(() => {
    setInterval(() => {
        if (isTransitioning.value) return
        isTransitioning.value = true
        enableTransition.value = true
        currentIndex.value += 1
    }, 3000)
})
</script>
<template>
    <div class="carousel">
        <!-- 輪播圖片容器 -->
        <div class="carousel-track" :style="{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: enableTransition ? 'transform 1s ease-in-out' : 'none'
        }" @transitionend="handleTransitionEnd">
            <img v-for="(image, index) in displayImages" :key="index" :src="image.url" alt="carousel image" />
        </div>
           <!-- 圓點指示器 -->
        <div class="carousel-dot">
            <div class="carousel-dots">
                <span v-for="(_
                    , index) in originalImages.length" :key="index" :class="{ active: index === realIndex }"
                    @click="goToSlide(index)"></span>
            </div>
        </div>

    </div>
</template>
<style scoped>
.carousel {
    position: relative;
    width: 100%;
    margin: auto;
    overflow: hidden;
}

.carousel-track {
    display: flex;
}

.carousel-track img {
    width: 100%;
    flex-shrink: 0;
}

.carousel-dot {
    z-index: 1000;
    position: absolute;
    bottom: 10px;
    left: 50%;
    /* 將左邊距設置為容器寬度的一半 */
    transform: translateX(-50%);
    /* 向左移動自身寬度的一半 */
}

.carousel-dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.carousel-dots span {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
}

.carousel-dots span.active {
    background-color: #333;
}
</style>
