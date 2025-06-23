<script setup>
import '@/assets/css/index.css';
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useStore } from 'vuex'
import { restoreState, setupStatePersistence } from '~/store/index'
//從sessionStorage恢復狀態
onMounted(() => {
  if (typeof window !== 'undefined') {
    restoreState()
    setupStatePersistence()
  }
})

</script>
<template>
  <div>
    <NuxtLayout />
    <Toaster richColors position="top-right" />
  </div>
</template>
