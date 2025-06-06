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
  <div class="relative w-full overflow-hidden">
    <div class="flex" :style="{
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: enableTransition ? 'transform 1s ease-in-out' : 'none'
    }" @transitionend="handleTransitionEnd">
      <img
        v-for="(image, index) in displayImages"
        :key="index"
        :src="image.url"
        alt="carousel image"
        class="w-full shrink-0"
      />
    </div>

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
      <div class="flex justify-center space-x-2 mt-2">
        <span
          v-for="(_, index) in originalImages.length"
          :key="index"
          class="w-2.5 h-2.5 rounded-full cursor-pointer"
          :class="index === realIndex ? 'bg-gray-800' : 'bg-gray-300'"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

