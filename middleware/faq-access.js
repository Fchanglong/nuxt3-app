import { useStore } from 'vuex'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore()
  
  // 獲取網站數據
  const websiteData = store.getters['website/getWebsiteData']
  
  // 如果數據還沒加載，先加載
  if (!websiteData || Object.keys(websiteData).length === 0) {
    await store.dispatch('website/fetchWebsiteData')

}
  
  const faq = store.getters['website/getWebsiteData']?.faq

  // 檢查是否允許訪問 FAQ 相關頁面
  if (to.path.startsWith('/faq/') && (!faq || !faq.isShow)) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})