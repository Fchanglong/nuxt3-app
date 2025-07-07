<script setup>
const route = useRoute()
import { useStore } from 'vuex'
const store = useStore()
const id = route.params.id

const { data: websiteData } = await useAsyncData('website', async () => {
    return store.getters['website/getWebsiteData']
})
const blog = computed(() => websiteData.value.blogs.find(item => item.id.toString() === id))
</script>

<template>
    <div v-if="blog" class="text-white w-full p-12 flex flex-col gap-3 items-center">
        <span class="text-2xl font-bold">{{ blog.title }}</span>
        <span class="text-sm text-[#EDEDED99] font-semibold">{{ blog.time }}</span>
        <p class="text-sm">{{ blog.content }}</p>
        <img class="md:w-full" :src="blog.img" alt="">
    </div>
    <div v-else>
        <span>加載中...</span>
    </div>
</template>