  <script setup>
  import { useStore } from 'vuex'
  const store = useStore()
  const { data: websiteData } = await useAsyncData('blogs-data', async () => {
    return store.getters['website/getWebsiteData']
  })
  const blogs = computed(() => {
    return websiteData.value?.blogs || {}
  })
  const { data: seoData } = await useAsyncData('blog-seo', async () => {
    return store.getters['website/getWebsiteSeo']
  })

  useHead({
    title: seoData.value.blog.title,
    meta: [
      {
        name: 'description',
        content: seoData.value.blog.description
      },
      {
        name: 'keywords',
        content: seoData.value.blog.keywords
      }
    ]
  })
</script>

<template>
  <div class="mx-auto my-10 px-10">
    <ul>
      <li class="my-12 cursor-pointer text-white group" v-for="item in blogs" :key="item.id">
        <NuxtLink class="flex flex-col md:flex-row-reverse hover:text-[#ac886b]" :to="`/posts/${item.id}`">
          <img class="w-full mb-3 md:w-[300px] h-fit" :src="item.img" alt="" />
          <div class="flex flex-col gap-5 px-4">
            <span class="text-3xl font-bold group-hover:text-[#ac886b]">
              {{ item.title }}
            </span>
            <span v-html="item.content" class="text-[#EDEDED99] line-clamp-2">
            </span>
            <div>
              <span class="text-[#EDEDED99] font-semibold">
                {{ item.time }}
              </span>
              <div class="w-[40px] h-[4px] bg-[#ac886b] mt-3"></div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>

  </div>
</template>



<style scoped></style>
