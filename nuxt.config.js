export default defineNuxtConfig({
  imports: {
    autoImport: true, // 确保自动导入功能已启用
  },
  compatibilityDate: "2025-05-15",
  css: ["~/assets/css/index.css"],
  // // 添加开发服务器代理配置
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "https://waca.lytc9988.uk",
          changeOrigin: true,
          secure: true,
        }
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    // '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  ssr: true,
  plugins: ["~/plugins/vuex.js"],
});
