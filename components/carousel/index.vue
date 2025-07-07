<script setup>
const props = defineProps({
  originalImages: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 使用 computed 让 displayImages 响应式更新
const displayImages = computed(() => {
  if (props.originalImages.length === 0) return []
  
  return [
    props.originalImages[props.originalImages.length - 1], // clone最后一张
    ...props.originalImages,
    props.originalImages[0], // clone第一张
  ]
})

const currentIndex = ref(1)
const enableTransition = ref(true)
const isTransitioning = ref(false)

// 真正图片索引（排除 clone）
const realIndex = computed(() => {
  if (props.originalImages.length === 0) return 0
  if (currentIndex.value === 0) return props.originalImages.length - 1
  if (currentIndex.value === displayImages.value.length - 1) return 0
  return currentIndex.value - 1
})

// 监听 props 变化，重置 currentIndex
watch(() => props.originalImages, (newImages) => {
  if (newImages.length > 0) {
    currentIndex.value = 1
    enableTransition.value = false
  }
}, { immediate: true })

// 点击圆点跳转
const goToSlide = (index) => {
  if (isTransitioning.value || props.originalImages.length === 0) return
  isTransitioning.value = true
  enableTransition.value = true
  currentIndex.value = index + 1
}

// 过渡结束后做无缝跳转
const handleTransitionEnd = () => {
  isTransitioning.value = false

  if (displayImages.value.length === 0) return

  // 跳回真正第一张
  if (currentIndex.value === displayImages.value.length - 1) {
    enableTransition.value = false
    currentIndex.value = 1
  }

  // 跳回真正最后一张
  if (currentIndex.value === 0) {
    enableTransition.value = false
    currentIndex.value = displayImages.value.length - 2
  }
}

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    if (isTransitioning.value || props.originalImages.length === 0) return
    isTransitioning.value = true
    enableTransition.value = true
    currentIndex.value += 1
  }, 3000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <div 
      v-if="displayImages.length > 0"
      class="flex" 
      :style="{
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: enableTransition ? 'transform 1s ease-in-out' : 'none'
      }" 
      @transitionend="handleTransitionEnd"
    >
      <img
        v-for="(image, index) in displayImages"
        :key="index"
        :src="image.url"
        alt="carousel image"
        class="w-full shrink-0"
      />
    </div>

    <!-- 显示默认图片如果没有数据 -->
    <div v-else class="w-full">
      <img 
        src="https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2aa9508ec08000e25efae/2160x.webp?source_format=jpg" 
        alt="默认图片" 
        class="w-full"
      />
    </div>

    <div v-if="originalImages && originalImages.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
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