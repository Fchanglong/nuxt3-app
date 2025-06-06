<script setup>
const testimonialsImgUrl = [
    {
        id: 1,
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/624fa4be376878001e2f938b/2160x.webp?source_format=jpg'
    },
    {
        id: 2,
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/625683fc97908800245e0774/2160x.webp?source_format=jpg'
    },
    {
        id: 3,
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/624ea5b84456bf002a91a16f/2160x.webp?source_format=jpg'
    },
    {
        id: 4,
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/625684b435d033001e8bbfee/2160x.webp?source_format=jpg'
    },
    {
        id: 5,
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/625684bf15c457002d38ea92/2160x.webp?source_format=jpg'
    },
    {
        id: 6,
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/624ea0c018cf51002102a7e5/2160x.webp?source_format=jpg'
    }
]
const testimonialsVideoUrl = [
    {
        id: 1,
        url: 'https://www.youtube.com/embed/NNGhD6R9b9w?autoplay=0&rel=1'
    },
    {
        id: 2,
        url: 'https://www.youtube.com/embed/UVr_pNWXQ2I?autoplay=0&rel=1'
    },
    {
        id: 3,
        url: 'https://www.youtube.com/embed/Co-yjhq8OPk?autoplay=0&rel=1'
    },
    {
        id: 4,
        url: 'https://www.youtube.com/embed/z5hUXzRUjhU?autoplay=0&rel=1'
    }
]
const toProductImgUrl=ref({
    url:'https://shoplineimg.com/62146b2be0f4410023ad65f9/62569c437ea4ca001eb13aee/2160x.webp?source_format=jpg',
    link:''
})
</script>
<template>
    <div>
        <div>
            <img v-for="item in testimonialsImgUrl" :key="item.id" :src="item.url" class="w-full h-auto object-cover ">
        </div>
        <div class="w-[70%]  max-w-[1100px] mx-auto my-10 px-4 md:px-0">
            <iframe v-for="video in testimonialsVideoUrl" :key="video.id" :src="video.url" frameborder="0"
                allowfullscreen class="w-full md:w-[1100px] h-auto  md:h-[562px] mb-10"></iframe>
        </div>
        <div class="mb-10 w-full mx-auto px-4 md:px-0 cursor-pointer">
            <img class="w-full" :src="toProductImgUrl.url" alt="" >
        </div>
    </div>
</template>

<style></style>