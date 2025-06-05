// server/api/posts.js
export default defineEventHandler(async (event) => {
    // 这里假设你有一个后端 API，或者可以直接写静态数据
    // 举例：直接返回一个数组
    const posts = [
      { id: 1, title: '第一篇文章', content: '这是第一篇文章的内容' },
      { id: 2, title: '第二篇文章', content: '这是第二篇文章的内容' },
      { id: 3, title: '第三篇文章', content: '这是第三篇文章的内容' }
    ]
  
    return {
      success: true,
      data: posts
    }
  })
  