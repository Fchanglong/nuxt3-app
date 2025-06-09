<script setup>
const introduce = ref({
  question: '為什麼相比按摩椅，買按摩椅墊比較不容易後悔?',
  secQuestion: '還在猶豫嗎?這些重點你是否都考慮過?',
  answer: '在現代生活中，隨著工作和生活壓力的增加，越來越多的人尋求通過按摩來舒緩身心。然而，面對市場上琳瑯滿目的按摩產品，消費者常常會在購買按摩椅三個月後才發現不適用，最終變成家裡堆衣服用的衣架。這裡我們將深入探討為什麼對於大多數人來說，按摩椅墊相比按摩椅是一個更聰明的購買選擇。'

})
const infoArr = [
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6666baf6688a300016ac9c03/540x.webp?source_format=jpg',
    title: '再高級的按摩椅也常有「按不到位」的問題',
    subtitle: '按了卻按不準，反而更難受',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6666c1ed5ecf8d001f0d8867/540x.webp?source_format=jpg',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6666c2ddf0ff926a1a6e577f/540x.webp?source_format=jpg',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6666c3c4d5073d0019c4c3f5/540x.webp?source_format=jpg',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6666c48a1fc3aa001089f835/540x.webp?source_format=jpg',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6666c56a544380000d88f7cd/540x.webp?source_format=jpg',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
]
</script>

<template>
  <div class="my-10 mx-auto w-full md:w-[1100px]">
    <div class="p-4 text-xl font-bold flex flex-col text-white gap-8">
      <span class="text-2xl">{{ introduce.question }}</span>
      <span class="text-gray-400">{{ introduce.secQuestion }}</span>
      <span class="font-normal">{{ introduce.answer }}</span>
    </div>
      <div class="w-full text-white mt-10">
        <div v-for="(item, index) in infoArr" :key="index" class="rounded-lg p-5 flex  items-center gap-5">
          <img :src="item.imgUrl" alt="" class="w-full h-[200px] md:h-fit object-cover rounded-lg">
          <div class="flex flex-col items-start justify-center gap-3">
            <h3 class="text-2xl font-bold">{{ item.title }}</h3>
            <h4 class="text-xl text-gray-500">{{ item.subtitle }}</h4>
            <p class="text-xl">{{ item.description }}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
</style>
