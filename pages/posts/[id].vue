<script setup>
const route = useRoute()
const id = route.params.id
const blogInfo = ref({
    id: 1,
    title: '這些穴道可以幫助睡眠！助眠按摩 3 招 一定要學會',
    introduce: '現代人在工作與生活之間越來越無法切割，也常常在休息時間沒辦法獲得足夠的休息。睡前想東想西、焦慮、失眠是很常見的現代症狀，但睡眠對健康是非常重要的！良好的睡眠能讓身體自我修復，提升免疫力，增強記憶力和集中力。這篇文章將和大家介紹有效助眠的穴道以及幫助睡眠的方法，讓你在忙碌的生活中也能擁有高品質的睡眠。',
    content:'文章内容',
    date: '2024-07-12',
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6690a346b80e24000d5c217b/800x.webp?source_format=png'
})
</script>
<template>
    <div class="text-white w-full p-12 flex flex-col gap-3 items-center">
        <span class="text-2xl font-bold">{{ blogInfo.title }}</span>
        <span class="text-sm text-[#EDEDED99] font-semibold">{{ blogInfo.date }}</span>
        <p class="text-sm">{{ blogInfo.introduce }}</p>
        <img class="md:w-full" :src="blogInfo.imgUrl" alt="">
    </div>
</template>