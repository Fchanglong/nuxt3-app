const baseUrl = 'https://waca.lytc9988.uk'; 
const request = $fetch.create({
  baseURL: baseUrl, // 直接使用 baseUrl，因为没有 config
  // 相当于 axios 的请求拦截器
  onRequest({ options }) {
    if (process.client) {
      const token = localStorage.getItem("token");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  },
  // 相当于 axios 的响应拦截器
  onResponse({ response }) {
    // 只返回数据部分，相当于 response.data
    return response._data;
  },
});

export default request;