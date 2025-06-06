<script setup>

const frequentAskList = ref([
    {
        question: 'JOY 和 JOY PRO有何不同?',
        answer: '相比第一代 JOY ，JOY PRO 強化了機芯設計，透過新導入的玻璃纖維強化齒輪成功提升50%動力，成為市面上唯一可平躺使用的按摩椅墊。',
        isOpen: false
    },
    {
        question: '30天體驗鑑賞方案是什麼？',
        answer: '為了讓您放心體驗，masa提供30天體驗鑑賞方案...',
        isOpen: false
    },
    {
        question: '可以平躺使用嗎？',
        answer: '可以平躺、斜躺按摩小腿、背部，不只沙發、床鋪、辦公椅都可以使用！',
        isOpen: false
    }
])

const toggleAnswer = (index) => {
     frequentAskList.value[index].isOpen = !frequentAskList.value[index].isOpen
}

const beforeEnter = (el) => {
    el.style.maxHeight = '0'
    el.style.opacity = '0'
    el.style.overflow = 'hidden'
    el.style.transition = 'max-height 0.3s ease, opacity 0.2s ease'
}

const enter = (el) => {
    requestAnimationFrame(() => {
        el.style.maxHeight = el.scrollHeight + 'px'
        el.style.opacity = '1'
    })
}

const afterEnter = (el) => {
    el.style.maxHeight = 'none'
}

const beforeLeave = (el) => {
    el.style.maxHeight = el.scrollHeight + 'px'
    el.style.opacity = '1'
    el.style.overflow = 'hidden'
    el.style.transition = 'max-height 0.3s ease, opacity 0.2s ease'
}

const leave = (el) => {
    requestAnimationFrame(() => {
        el.style.maxHeight = '0'
        el.style.opacity = '0'
    })
}

const afterLeave = (el) => {
    el.style.maxHeight = ''
    el.style.opacity = ''
    el.style.overflow = ''
    el.style.transition = ''
}

</script>


<template>
  <div class="w-full bg-white">
    <div class="max-w-[1100px] mx-auto p-5">
      <h2 class="text-2xl font-bold mb-4">常見問題</h2>
      <ul>
        <li
          v-for="(item, index) in frequentAskList"
          :key="index"
          class="mb-2 border-b border-gray-300 py-2 cursor-pointer"
        >
          <div
            class="flex justify-between items-center"
            @click="toggleAnswer(index)"
          >
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
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <p v-if="item.isOpen" class="mt-2 text-gray-600 px-4">
              {{ item.answer }}
            </p>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>
