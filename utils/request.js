// 根据环境设置不同的 baseURL
const getBaseURL = () => {
  if (process.server) {
    // 服务端直接使用完整 URL
    return "https://waca.lytc9988.uk";
  } else {
    // 客户端使用相对路径（通过 Vite 代理）
    return "/api";
  }
};

// const baseURL='https://waca.lytc9988.uk'
const request = $fetch.create({
  baseURL: getBaseURL(),
  onRequest({ request, options }) {
    
  },
  onResponse({ response }) {
    return response._data;
  },
});

export default request;
