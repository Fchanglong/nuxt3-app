import request from "../utils/request.js";
//獲取全部商品
export const getAllCommoditiesApi = () => {
  return request(`/api1.0/oig`);
};

//獲取分類商品菜單
export const getCateCommoditiesMenuApi = () => {
  return request(`/api1.0/oic`);
};

//根據分類id獲取分類商品
export const getCommoditiesByIdApi = (id) => {
  return request(`/api1.0/oig?oic_id=${id}`);
};

//根據分類id獲取商品詳情
export const getCommodityByIdApi = (id) => {
  return request(`/api1.0/oig/${id}`);
};

//根據商品id獲取商品選擇后的信息
export const getCommoditySelectInfoApi = (id) => {
  return request(`/api1.0/oi/sub?itemid=${id}`);
};