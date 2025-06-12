export default defineNuxtConfig({
  imports: {
    autoImport: true, // 确保自动导入功能已启用
  },
  compatibilityDate: "2025-05-15",
  css: ["~/assets/css/index.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    // '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  ssr: true,
  plugins: ["~/plugins/vuex.js"],
});
