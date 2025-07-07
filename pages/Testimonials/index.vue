<script setup>
import { useStore } from 'vuex'
const store = useStore()
const { data: websiteData } = await useAsyncData('website', async () => {
    return store.getters['website/getWebsiteData']
})
const testimonials = computed(() => {
    return websiteData.value?.testimonials || {}
})


</script>
<template>
    <div>
        <div>
            <img v-for="item in testimonials.img"  :src="item" class="w-full h-auto object-cover ">
        </div>
        <div class="w-[70%]  max-w-[1100px] mx-auto my-10 px-4 md:px-0">
            <iframe v-for="video in testimonials.video"  :src="video" frameborder="0"
                allowfullscreen class="w-full md:w-[1100px] h-auto  md:h-[562px] mb-10"></iframe>
        </div>
   
    </div>
</template>

<style></style>