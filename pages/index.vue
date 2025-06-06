<script setup lang="ts">

const topCarousel = [
  {
    id: 1,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2aa9508ec08000e25efae/2160x.webp?source_format=jpg',
  },
  {
    id: 2,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6613a935a849d9000e7715e5/2160x.webp?source_format=jpg',
  },
  {
    id: 3,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/657849392677e60011e85951/2160x.webp?source_format=png',
  },
  {
    id: 4,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2aab2401dfd000d28bf3f/2160x.webp?source_format=jpg',
  },
]
const bottomCarousel = [
  {
    id: 1,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65798683eb2b63001478270e/1296x.webp?source_format=png',
  },
  {
    id: 2,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65789b19390f27001dec1c61/1296x.webp?source_format=jpg',
  },
  {
    id: 3,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6579894bbd2a170011d9d00e/1296x.webp?source_format=png',
  },
  {
    id: 4,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/657982603fc56f001d79c4ed/1080x.webp?source_format=png',
  },
  {
    id: 5,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65798b6926bb730011c7dc8d/1296x.webp?source_format=png',
  },
]
const warrantyImgUrl = "https://shoplineimg.com/62146b2be0f4410023ad65f9/67fe86f435881a3df004c23f/2160x.webp?source_format=jpg"
const lieImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/665354f66df50d001960dbe6/540x.webp?source_format=jpg'
const pressImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2ab4c4780c2000a2c49c2/2160x.webp?source_format=jpg'
const badImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2ab7a9661f7000ee81f51/2160x.webp?source_format=jpg'
const phoneImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2ab8c317b0f0011403189/2160x.webp?source_format=jpg'
const chairImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6605153510beaf0017e424c6/2160x.webp?source_format=jpg'
const commentImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67fe87509a5ef8420c0861a2/2160x.webp?source_format=jpg'
const blogInfoArr = [
  {
    title: 'Blog Post 1',
    description: 'Description for blog post 1',
    imageUrl: 'https://img.shoplineapp.com/media/image_clips/6690a346b80e24000d5c217b/original.png?1720755013',
    link: 'https://example.com/blog1',
    data: '2023-10-01'
  },
  {
    title: 'Blog Post 2',
    description: 'Description for blog post 2',
    imageUrl: 'https://img.shoplineapp.com/media/image_clips/64986cd4b89b510011208beb/original.jpg?1687710932',
    link: 'https://example.com/blog2',
    data: '2023-10-02'
  },
  {
    title: 'Blog Post 3',
    description: 'Description for blog post 3',
    imageUrl: '	https://img.shoplineapp.com/media/image_clips/63e769a17d0520000ebcec3d/original.jpg?1676110241',
    link: 'https://example.com/blog3',
    data: '2023-10-03'
  },
  {
    title: 'Blog Post 4',
    description: 'Description for blog post 4',
    imageUrl: 'https://img.shoplineapp.com/media/image_clips/640fda72cee31b0017cbcc8e/original.jpg?1678760562',
    link: 'https://example.com/blog4',
    data: '2023-10-04'
  }
]
</script>
<template>
  <div class=" overflow-x-hidden px-4 md:px-0">
    <Carousel :originalImages="topCarousel" />

    <div class="w-full">
      <img :src="warrantyImgUrl" alt="" class="w-full" />
    </div>

    <div class="flex flex-col items-center gap-[70px] py-[60px] md:gap-[70px] md:py-[60px]">
      <div class="flex flex-col md:flex-row gap-5 mt-[50px] items-center md:items-start">
        <img :src="lieImgUrl" alt="" class="w-[525px]" />

        <div class="w-full md:w-[555px] flex flex-col items-center text-white gap-5 font-bold px-2.5 text-center">
          <span class="text-[1.8rem]">小空間的極致享受!</span>
          <span class="text-gray-400">我們相信，空間與預算不應該是體驗被妥協的理由</span>
          <p class="w-[525px] text-center">
            masa 耗時三年，開發出超越頂級按摩椅自由度、精準度的控制系統，並結合至輕薄的按摩椅墊中，
            成為市面上唯一一款不佔空間、超高CP值且極度精準的背部按摩器，短短兩年內即成為同品類的銷量冠軍!
          </p>
          <button class="text-white bg-[#ac886b] px-10 py-1.5 rounded text-[1.1rem]">點我看設計理念</button>
        </div>
      </div>

      <iframe
        class="w-full md:w-[1100px] h-auto  md:h-[562px]"
        src="https://www.youtube.com/embed/bBXP8bJ0uCk?iv_load_policy=3&playsinline=1&start=0&rel=0&autoplay=0&mute=0&muted=0"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>

    <div class="w-full">
      <img :src="pressImgUrl" alt="" class="w-full" />
      <img :src="badImgUrl" alt="" class="w-full" />
      <img :src="phoneImgUrl" alt="" class="w-full" />
    </div>

    <div class="flex flex-col items-center justify-center  my-[70px]">
      <span class="text-white  text-[1.8rem] pb-[50px]">產品特色說明</span>
      <iframe
        class="w-full md:w-[1100px] h-auto md:h-[562px]"
        src="https://www.youtube.com/embed/Gdey5SsWo5k?iv_load_policy=3&playsinline=1&start=0&rel=0&autoplay=0&mute=0&muted=0"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>

    <div class="w-full">
      <img :src="chairImgUrl" alt="" class="w-full" />
      <img :src="commentImgUrl" alt="" class="w-full" />
    </div>

    <div class="flex justify-center pb-5">
      <div class="w-[1080px]">
        <Carousel :originalImages="bottomCarousel" />
      </div>
    </div>

    <FrequentAsk />

    <div class="max-w-[68.5rem] w-full mx-auto px-5 text-white flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-4">部落格文章</h2>
      <ul class="flex flex-col md:flex-row gap-5">
        <li v-for="(item, index) in blogInfoArr" :key="index" class="flex flex-col items-start">
          <img :src="item.imageUrl" alt="" class="w-full md:w-[247px] h-auto object-cover" />
          <span>{{ item.data }}</span>
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <a :href="item.link" class="text-[#ac886b] font-bold underline underline-offset-4">閲讀内文</a>
        </li>
      </ul>
      <button class="mt-12 md:mt-[200px] px-10 py-2 rounded bg-[#ac886b] text-white hover:bg-white hover:text-[#1d1a1a] transition">
        查看更多
      </button>
    </div>
  </div>
</template>
