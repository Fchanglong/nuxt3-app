<!-- pages/about.vue -->
<template>
  <div class="container mx-auto p-4">
    <!-- 如果拉取接口时出错，显示错误信息 -->
    <div v-if="error">
      <h2 class="text-red-500">加载失败：{{ error.statusMessage || error.message }}</h2>
    </div>
    <!-- 如果正在加载，还没拿到数据，可显示 loading 提示 -->
    <div v-else-if="!company">
      <p>{{company}}</p>
    </div>
    <!-- 数据拿到后，正常渲染页面内容 -->
    <div v-else>
      <h1 class="text-3xl font-bold mb-4">{{ company.name }}</h1>
      <p class="mb-2">{{ company.description }}</p>
      <NuxtLink to="/" class="text-blue-500">返回首页</NuxtLink>
      <!-- 如果你希望把 gaScript 作为一个行内脚本插入 body：</NuxtScript> -->
      <!-- <NuxtScript v-if="company.value.gaScript" strategy="afterInteractive">
        {{ company.value.gaScript }}
      </NuxtScript> -->
    </div>
  </div>
</template>

<script setup>
// 1. 导入必要的 Composition API
import { useAsyncData, useSeoMeta, watchEffect } from '#imports'

// 2. 通过 useAsyncData 拉取 /api/about 接口
//    SSR 阶段会先执行这一句，提前把数据拿到
const { data: company, error } = await useAsyncData('fetch-company-info', () =>
  $fetch('/api/about').then(res => {
    if (!res.success) throw new Error('接口返回失败')
    return res.data
  })
)

// 3. 当 company.value 有数据后，用 useSeoMeta 设置动态的 SEO
watchEffect(() => {
  if (company.value) {
    useSeoMeta({
      title: company.value.name + ' - 关于我们',
      ogTitle: company.value.name + ' - 关于我们',
      description: company.value.description,
      ogDescription: company.value.description,
      // keywords 会自动添加到 <meta name="keywords" content="...">
      keywords: company.value.keywords,
      ogImage: company.value.ogImage,
      twitterCard: 'summary_large_image'
      // 如果你需要给 body 加 class 或其它属性，可以配合 useHead:
      // bodyAttrs: { class: 'about-page' }
    })
  }
})
</script>

<style scoped>
.container { max-width: 800px; }
</style>
