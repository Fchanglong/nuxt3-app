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
useHead({
  title: '電商網站',
  meta: [
    { name: 'description', content: '非常好的電商網站' }
  ],

})
</script>
<template>
  <div>
    <NuxtLayout />
    <Toaster richColors position="top-right" />
  </div>
</template>
