<script setup>
const props = defineProps({
  faqList: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: '常見問題'
  }
})

// 複製本地狀態
const localFaqList = ref([])

watch(() => props.faqList,(newList) => {
    // 深拷貝，避免引用同一個物件
    localFaqList.value = newList.map(item => ({ ...item }))
  },
  { immediate: true }
)

const toggleAnswer = async (index) => {
  const item = localFaqList.value[index]
  item.isOpen = !item.isOpen

  await nextTick()
  const el = document.getElementById(`answer-${index}`)
  if (!el) return

  if (item.isOpen) {
    el.style.maxHeight = el.scrollHeight + 'px'
    el.style.opacity = '1'
  } else {
    el.style.maxHeight = '0'
    el.style.opacity = '0'
  }
}
</script>

<template>
  <div class="w-full bg-white">
    <div class="max-w-[1100px] mx-auto p-5 select-none">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <ul>
        <li
          v-for="(item, index) in localFaqList"
          :key="index"
          class="mb-2 border-b border-gray-300 py-2 cursor-pointer"
        >
          <div class="flex justify-between items-center" @click="toggleAnswer(index)">
            <h3 class="text-lg font-bold text-gray-800 hover:text-[#ac886b]">
              {{ item.question }}
            </h3>
            <img
              src="/svg/plus.svg"
              alt="Toggle Icon"
              class="w-[30px] h-[30px] ml-2 transition-transform duration-300"
              :class="{ 'rotate-[150deg]': item.isOpen }"
            />
          </div>
          <div
            :id="`answer-${index}`"
            class="overflow-hidden transition-all duration-300 ease-in-out px-4 text-gray-600 max-h-0 opacity-0"
          >
            <p class="py-2">{{ item.answer }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
