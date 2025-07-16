<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const { data: websiteData } = await useAsyncData('footer-data', async () => {
    return store.getters['website/getWebsiteData']
})
const paymentImgUrl = computed(() => {
    return websiteData.value?.other.footer?.paymentIcon || []
})
</script>
<template>
    <footer class="bg-white flex flex-col items-center justify-center">
        <div class="flex w-[50%] justify-center mt-4">
            <div class="flex flex-col items-center gap-5 w-full">
                <span class="font-bold text-xl">{{ websiteData.other.footer?.leftText.title }}</span>
                <span class="text-sm">
                    {{ websiteData.other.footer?.leftText.content }}
                </span>
            </div>
            <div class="flex flex-col items-center gap-5 w-full text-sm">
                <span class="font-bold text-xl">{{ websiteData.other.footer?.rightText.title }}</span>
                <span class="text-center">
                    <p>{{ websiteData.other.footer?.rightText.content }}</p>
                </span>
            </div>
        </div>
        <div class="flex w-[50%] justify-start gap-3 mt-10">
            <img v-for="(item, index) in paymentImgUrl" :key="index" :src="item" alt="">
        </div>
        <div class="text-sm font-bold my-8 ">
            <p>{{ websiteData.other.footer?.copyright }}</p>
        </div>
        <div class="w-full h-[2rem] bg-[#ac886b]"></div>
    </footer>
</template>
<style scoped></style>