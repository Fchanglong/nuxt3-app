<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { onMounted } from "vue";
import { useStore } from 'vuex'
import { getCateCommoditiesMenuApi } from "~/api/commodify-api";
const store = useStore()
const topCarousel = ref([]);
const getCarouselImages = async () => {
  const res = await getCateCommoditiesMenuApi();
  return res.data.NEW.map(item => ({
    id: item.cid,
    url: item.images
  }));
};
onMounted(async () => {
  topCarousel.value = await getCarouselImages();
})
const { data: websiteData } = await useAsyncData('website', async () => {
  return store.getters['website/getWebsiteData']
})
const blogInfoArr = computed(() => websiteData.value?.blogs || [])
const frequentAskList = computed(() => websiteData.value?.home?.faq || [])
const bottomCarousel = computed(() => {
  return (websiteData.value?.home?.carousel || []).map((url, idx) => ({
    url,
    id: idx
  }))
})
</script>
<template>
  <div class=" overflow-x-hidden px-4 md:px-0">
    <Carousel :originalImages="topCarousel || []" />

    <div class="w-full">
      <img :src="websiteData.home?.img[0]" alt="" class="w-full" />
    </div>

    <div class="flex flex-col items-center gap-[70px] py-[60px] md:gap-[70px] md:py-[60px]">
      <div v-if="websiteData.home?.isShow" class="flex flex-col md:flex-row gap-5 mt-[50px] items-center md:items-start">
        <img :src="websiteData.home?.img" alt="" class="w-[525px]" />
        <div class="w-full md:w-[555px] flex flex-col items-center text-white gap-5 font-bold px-2.5 text-center">
          <span class="text-[1.8rem]">{{ websiteData.home?.title }}</span>
          <span class="text-gray-400">{{ websiteData.home?.sub }}</span>
          <p class="w-[525px] text-center">
            {{ websiteData.home?.text }}
          </p>
          <button class="text-white bg-[#ac886b] px-10 py-1.5 rounded text-[1.1rem]">點我看設計理念</button>
        </div>
      </div>


      <iframe class="w-full md:w-[1100px] h-auto  md:h-[562px]" :src="websiteData.home?.video[0]" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>

    <div class="w-full">
      <img :src="websiteData.home?.img[1]" alt="" class="w-full" />
      <img :src="websiteData.home?.img[2]" alt="" class="w-full" />
      <img :src="websiteData.home?.img[3]" alt="" class="w-full" />
    </div>

    <div class="flex flex-col items-center justify-center  my-[70px]">
      <span class="text-white  text-[1.8rem] pb-[50px]">產品特色說明</span>
      <iframe class="w-full md:w-[1100px] h-auto md:h-[562px]" :src="websiteData.home?.video[1]" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>

    <div class="w-full">
      <img :src="websiteData.home?.img[4]" alt="" class="w-full" />
    </div>

    <div class="flex justify-center pb-5">
      <div class="w-[1080px]">
        <Carousel :originalImages="bottomCarousel" />
      </div>
    </div>

    <Faq :faqList="frequentAskList" />

    <div class="max-w-[68.5rem] w-full mx-auto my-10 px-5 text-white flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-4">部落格文章</h2>
      <ul class=" flex  flex-col md:flex-row  gap-5 mb-5">
        <li v-for="(item, index) in blogInfoArr.slice(0,4)" :key="index" class="flex flex-col items-start w-72">
          <img :src="item.img" alt="" class="w-full md:w-[247px] h-auto object-cover" />
          <span>{{ item.time }}</span>
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <ClientOnly >
          <p class="line-clamp-2" v-html="item.content"></p>  
          </ClientOnly>
          <a :href="`http://localhost:3000/posts/${item.id}`" class="text-[#ac886b] font-bold underline underline-offset-4">
            閲讀内文
          </a>
        </li>
      </ul>
      <NuxtLink to="/posts"
        class="mt-12 md:w-[200px] text-center md:mt-0 px-10 py-2 rounded bg-[#ac886b] text-white hover:bg-white hover:text-[#1d1a1a] transition">
        查看更多
      </NuxtLink>
    </div>
  </div>
</template>
