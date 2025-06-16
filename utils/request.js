const baseURL = "/api";
// const baseURL='https://waca.lytc9988.uk'
const request = $fetch.create({
  baseURL: baseURL,
  onRequest({ request, options }) {
    
  },
  onResponse({ response }) {
    return response._data;
  },
});

export default request;
