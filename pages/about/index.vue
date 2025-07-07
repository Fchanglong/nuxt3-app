<script setup>
import { useStore } from 'vuex'
const store = useStore()
const { data: websiteData } = await useAsyncData('about-data', async () => {
  return store.getters['website/getWebsiteData']
})
const about= computed(() => {
  return websiteData.value?.about || {}
})

const { data: seoData } = await useAsyncData('about-seo', async () => {
  return store.getters['website/getWebsiteSeo']
})

useHead({
  title: seoData.value.about.title,
  meta: [
    {
      name: 'description',
      content: seoData.value.about.description
    },
    {
      name:'keywords',
      content: seoData.value.about.keywords
    }
  ]
})
</script>
<template>
  <div class=" overflow-x-hidden flex flex-col items-center justify-center gap-5 px-4 md:px-0 ">
    <div class="w-full">
      <img v-for="(item, index) in about.img " :key="index" class="w-full" :src="item" alt="">
    </div>
    <div v-if="about.description.isShow" class="w-full md:w-[67.5rem] text-white text-center p-5 flex flex-col items-center gap-5">
      <span class="block text-2xl font-bold">{{ about.description.content.title }}</span>
      <span class="block text-lg text-gray-500">{{ about.description.content.sub }}</span>
      <p class="w-[80%] leading-10">{{ about.description.content.text }}</p>
    </div>
    <div>
      <div class=" w-full max-w-[1100px] text-white  ">
        <div v-for="(item, index) in about.introduce" :key="index" class="rounded-lg p-5 flex flex-col md:flex-row items-center gap-5">
          <img :src="item.img" alt="" class="size-[200px] md:w-[500px] md:h-[500px] object-cover rounded-lg">
          <div class="flex flex-col items-start justify-center gap-2">
            <h3 class="text-xl font-bold">{{ item.title }}</h3>
            <h4 class="text-lg text-gray-500">{{ item.sub }}</h4>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="about.endText.isShow" class="w-full max-w-[1100px] text-white p-5 flex flex-col  gap-5">
      <span class="block text-2xl font-bold">{{ about.endText.content.title }}</span>
      <span class="block text-lg text-gray-500">{{ about.endText.content.sub }}</span>
      <p class="w-[80%] ">{{ about.endText.content.text }}</p>
      <NuxtLink to="/products/categories">
        <button class="px-10 py-2 rounded bg-[#ac886b] text-white hover:bg-white hover:text-[#1d1a1a] transition whitespace-nowrap min-w-[8rem] max-w-full w-fit">
          點我看商品頁
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
