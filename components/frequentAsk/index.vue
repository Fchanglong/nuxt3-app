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
    <div class="frequent-ask-container">
        <div class="frequent-ask">
            <h2>常見問題</h2>
            <ul>
                <li v-for="(item, index) in frequentAskList" :key="index" class="faq-item">
                    <div class="faq-header" @click="toggleAnswer(index)">
                        <h3 class="faq-question">
                            {{ item.question }}
                        </h3>
                        <div>
                            <img :src="'/svg/plus.svg'" alt="Toggle Icon" class="toggle-icon"
                                :class="{ rotated: item.isOpen }" />

                        </div>
                    </div>
                    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                        @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
                        <p v-if="item.isOpen" class="faq-answer">
                            {{ item.answer }}
                        </p>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.frequent-ask-container {
    width: 100%;
    background: white;
}

.frequent-ask {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
}

.faq-item {
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    cursor: pointer;
}

.faq-question {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    transition: color 0.3s;
}

.faq-question:hover {
    color: #ac886b;
}

.faq-answer {
    margin-top: 8px;
    color: #555;
    padding: 0 16px;
    will-change: max-height, opacity;

}

.toggle-icon {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    transition: transform 0.3s ease;
}

.rotated {
    transform: rotate(150deg);
}

.faq-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
