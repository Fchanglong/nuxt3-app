<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const { data: websiteData } = await useAsyncData('website', async () => {
    return store.getters['website/getWebsiteData']
})
const currentData = computed(()=>{
  return websiteData.value?.faq?.items.find(item=>item.url === route.path) || {}
})
const title = 'JOY PRO相關問題'
const questionList = computed(() => {
  const list = currentData.value?.qaList || []
  // 給每個問題項目加上 isOpen 屬性
  return list.map(item => ({
    ...item,
    isOpen: false
  }))
})
definePageMeta({
  middleware: 'faq-access'
})
</script>

<template>
    <div>
        <div>
            <img v-for="imgUrl in currentData.content.img" :src="imgUrl" alt="">
            <Faq class="bg-white" :faqList="questionList" :title />
        </div>
    </div>
</template>


<style></style>