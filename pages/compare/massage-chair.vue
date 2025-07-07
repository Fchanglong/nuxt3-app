<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const { data: websiteData } = await useAsyncData('website', async () => {
    return store.getters['website/getWebsiteData']
})
const currentData = computed(()=>{
  return websiteData.value?.compare?.items.find(item=>item.url === route.path).content || {}
})
definePageMeta({
  middleware: 'compare-access'
})
</script>

<template>
  <div class="my-10 mx-auto w-full md:w-[1100px]">
    <div class="p-4 text-xl font-bold flex flex-col text-white gap-8">
      <span class="text-2xl">{{ currentData.topInfo.title }}</span>
      <span class="text-gray-400">{{ currentData.topInfo.sub }}</span>
      <span class="font-normal">{{ currentData.topInfo.text }}</span>
    </div>
      <div class="w-full text-white mt-10">
        <div v-for="(item, index) in currentData.description" :key="index" class="rounded-lg p-5 flex  items-center gap-5">
          <img :src="item.img" alt="" class="w-full h-[200px] md:h-fit object-cover rounded-lg">
          <div class="flex flex-col items-start justify-center gap-3">
            <h3 class="text-2xl font-bold">{{ item.title }}</h3>
            <h4 class="text-xl text-gray-500">{{ item.sub }}</h4>
            <p class="text-xl">{{ item.text }}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
</style>
