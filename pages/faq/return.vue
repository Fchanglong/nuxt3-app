<script setup>
const imgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6613a09a477b7c6690cafc06/2160x.webp?source_format=jpg'
const title = '30天試用方案常見問答'
const returnAskList = ref([
    {
        question: '30天試用期方案説明',
        answer: '為了讓您放心體驗，masa提供30天試用鑑賞方案，自商品到貨日起算，機器沒有人為毀損、外包裝等耗材皆有保留，您可以透過點擊官網右下方藍色浮動圖示聯絡masa客服申請退貨，無須負擔任何費用。',
        isOpen: false
    },
    {
        question: '如何申請退貨呢？',
        answer: '※每筆訂單僅提供乙次免費退貨服務，若有少退回的零件，需自行負擔寄送運費，※ 若訂單包含多樣商品，可以申請部份退貨。如因部分/全部訂單退貨，導致未達活動贈品領取資格，則贈品需一同退還。※ 若訂單包含多樣商品，可以申請部份退貨。如因部分/全部訂單退貨，導致未達活動贈品領取資格，則贈品需一同退還。',
        isOpen: false
    },
    {
        question: '30天試用期方案説明',
        answer: '為了讓您放心體驗，masa提供30天試用鑑賞方案，自商品到貨日起算，機器沒有人為毀損、外包裝等耗材皆有保留，您可以透過點擊官網右下方藍色浮動圖示聯絡masa客服申請退貨，無須負擔任何費用。',
        isOpen: false
    },
    {
        question: '如何申請退貨呢？',
        answer: '※每筆訂單僅提供乙次免費退貨服務，若有少退回的零件，需自行負擔寄送運費，※ 若訂單包含多樣商品，可以申請部份退貨。如因部分/全部訂單退貨，導致未達活動贈品領取資格，則贈品需一同退還。※ 若訂單包含多樣商品，可以申請部份退貨。如因部分/全部訂單退貨，導致未達活動贈品領取資格，則贈品需一同退還。',
        isOpen: false
    },
])
</script>

<template>
    <div class="w-full">
        <img :src="imgUrl" alt="">
        <div class=" mx-auto my-0 ">
            <Faq :faqList="returnAskList" :title />
        </div>
    </div>
</template>


<style></style>