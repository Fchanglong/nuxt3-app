<script setup>
const frequentAskList = ref([
    {
        question: ' JOY 和 JOY PRO有何不同?',
        answer: '相比第一代 JOY ，JOY PRO 強化了機芯設計，透過新導入的玻璃纖維強化齒輪成功提升50%動力，成為市面上唯一可平躺使用的按摩椅墊。'
    },
    {
        question: '30天體驗鑑賞方案是什麼？',
        answer: '為了讓您放心體驗，masa提供30天體驗鑑賞方案，自收到商品日起算，30天內使用如果不滿意，只要機器沒有人為毀損、外包裝等耗材皆有保留，您可以透過點擊官網右下方藍色浮動圖示聯絡masa客服申請退貨，無須負擔任何費用。'
    },
    {
        question: '可以平躺使用嗎？',
        answer: '可以平躺、斜躺按摩小腿、背部，不只沙發、床鋪、辦公椅都可以使用！'
    }
])
</script>
<template>
    <div class="frequent-ask-container">
        <div class="frequent-ask">
            <h2>常見問題</h2>
            <ul>
                <li v-for="(item, index) in frequentAskList" :key="index">
                    <h3>{{ item.question }}</h3>
                    <p>{{ item.answer }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.frequent-ask-container {
    width: 100%; 
    background: white
}
.frequent-ask {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
   ;
}
</style>
