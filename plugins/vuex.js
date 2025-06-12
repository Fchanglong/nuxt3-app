import store from '~/store/index'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
  
  // 提供全局访问
  nuxtApp.provide('store', store)
})