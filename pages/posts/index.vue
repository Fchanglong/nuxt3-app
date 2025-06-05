<!-- pages/posts.vue -->
<template>
    <div class="container mx-auto p-4">
        <NuxtLink to="/" class="text-blue-500">返回首页</NuxtLink>
      <h1 class="text-2xl font-bold mb-4">文章列表</h1>
      <div v-if="error">
        <p class="text-red-500">加载失败：{{ error.message }}</p>
      </div>
      <ul v-else>
        <li
          v-for="post in posts"
          :key="post.id"
          class="mb-2 border-b pb-2"
        >
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  // 不带 <lang="ts">，纯 JavaScript
  const { data, error } = await useAsyncData('fetch-posts', () =>
    $fetch('/api/posts').then(res => {
      if (!res.success) throw new Error('拿数据失败')
      return res.data
    })
  )
  
  // data.value 是后端返回的数组，故重命名为 posts
  const posts = data.value || []
  </script>
  
  <style scoped>
  /* 你可以自己写一些简单样式 */
  .container { max-width: 800px; }
  </style>
  