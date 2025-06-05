// server/api/posts.js
export default defineEventHandler(async (event) => {
    // 这里假设你有一个后端 API，或者可以直接写静态数据
    // 举例：直接返回一个数组
    const posts = {
        "name": "示例公司1",
        "description": "这是示例公司的简介，用于 SEO 描述。",
        "keywords": "示例公司, 企业简介, Nuxt3",
        "ogImage": "https://example.com/images/company-og.jpg",
        "gaScript": "console.log('埋点脚本或 Google Analytics 初始化');"
      }
  
    return {
      success: true,
      data: posts
    }
  })
  