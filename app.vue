<script setup>
import '@/assets/css/index.css';
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner'

</script>

<template>
  <div>
    <NuxtLayout />
    <Toaster richColors position="top-right" />
  </div>
</template>