<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
     <Masaheader />
    <NuxtLayout />
  </div>
</template>
<script setup>
import Masaheader from "@/components/header/index.vue";
</script>
<style>
body{
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #f8f9fa; /* 设置全局背景色 */
}
ul {
  list-style: none;   /* 去掉圆点 */
  margin: 0;          /* 去掉 ul 默认的外边距 */
  padding: 0;         /* 去掉 ul 默认的内边距 */
}
</style>
