<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const { data: websiteData } = await useAsyncData('website', async () => {
    return store.getters['website/getWebsiteData']
})
const currentData = computed(() => {
    return websiteData.value?.faq?.items.find(item => item.url === route.path) || {}
})
const description = computed(() => {
    console.log(currentData.value?.content.description);
    
    return currentData.value?.content.description || {}
})
const videoUrl = computed(() =>{
    return currentData.value.content.video || []
})


</script>

<template>
    <div class="md:w-[1100px] p-5 my-0 mx-auto flex flex-col gap-5">
         <div class="flex" v-for="item in description" >
            <img :src="item.img" alt="">
            <div class="max-w-[500px] text-white p-5">
                <span class="text-2xl font-bold ">{{ item.title }}</span>
                <p class="text-sm mt-5">{{ item.text }}</p>
            </div>
        </div>

        <div class="flex flex-col gap-8">
            <iframe class="w-full h-[380px]  md:h-[480px]" v-for="item in videoUrl" :src="item" 
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</template>


<style></style>