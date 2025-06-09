<script setup>
const title = 'JOY PRO相關問題'
const imgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6613ac5bf1cf71001121f376/2160x.webp?source_format=jpg'
const questionList = ref([
    {
        question: '有JOY PRO的體驗據點嗎？',
        answer: '目前並沒有JOY PRO的實體體驗據點，masa提供30天體驗鑑賞方案，可以於官網下單，待收到商品後啟動30天體驗鑑賞方案，過程中只要不喜歡，在機器無毀損的狀況下可直接退貨，免額外付費，方便您在家體驗！',
        isOpen: false
    },

    {
        question: '我要怎麼查到在挖貝募資平台的訂單資料？',
        answer: '點擊下方連結至挖貝募資網頁後，點選右上方「登入」按鈕，選擇您當初登入的帳號，可以看到「交易紀錄」，就可以找到訂單資料囉。',
        isOpen: false
    },
    {
        question: '可以指定到貨日期嗎？',
        answer: '商品將配合黑貓貨運配送，可填寫指定到貨時間，我們盡量請黑貓留意，實際配送狀況依貨運路順為主。',
        isOpen: false
    },
    {
        question: 'JOY PRO和 JOY的差別是什麼？',
        answer: 'JOY PRO 相比第一代 JOY ，強化了機芯設計，透過新導入的航太級玻璃纖維強化齒輪，成功提升50%承重度、耐受度，讓百公斤的人都能平躺使用！',
        isOpen: false
    },
])

</script>

<template>
    <div>
        <div>
            <img :src="imgUrl" alt="">
            <Faq class="bg-white" :faqList="questionList" :title />
        </div>
    </div>
</template>


<style></style>