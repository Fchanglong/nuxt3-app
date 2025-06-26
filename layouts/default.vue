<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { restoreState, setupStatePersistence } from '~/store/index'

const store = useStore()


const { data: seoData } = await useAsyncData('website-seo', async () => {
  await store.dispatch('website/fetchWebsiteData');
  return store.getters['website/getWebsiteSeo']
});

onMounted(async () => {
  if (process.client) {
    restoreState()
    setupStatePersistence()
  }
  //客戶端的website数据
  await store.dispatch('website/fetchWebsiteData');
})

// 使用响应式的 useHead
useHead({
  title:seoData.value.og_title,
  meta: [
    {
      name: 'description',
      content: seoData.value.meta_description
    },
    {
      name: 'keywords',
      content: seoData.value.meta_keywords
    },
    {
      property: 'og:description',
      content: seoData.value.og_description
    },
    {
      property: 'og:title',
      content: seoData.value.og_title
    },
    {
      property: 'og:image',
      content: seoData.value.og_image
    },
    {
      property: 'og:url',
      content: seoData.value.og_url
    }
  ],
})

</script>
<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-1">
      <!-- 渲染当前路由对应的页面 -->
      <NuxtPage />
    </main>
    <Footer />

    <!-- 購物車模態框 -->
    <CartModal />
  </div>
</template>
