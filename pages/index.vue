<template>
    <div>
      <h2>Welcome to the default page</h2>
      <div>
          <NuxtLink to="/about" class="text-blue-500">about</NuxtLink>
      </div>
      <div>
          <NuxtLink to="/posts" class="text-blue-500">posts</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'default'  // 设置当前页面使用 default 布局
  })
  </script>