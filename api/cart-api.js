import request from "../utils/request.js";

// 获取购物车
export const getCartApi = () => {
  const nowtime = new Date().getTime()
  return request(`/api0/cus/api/get-cart?_=${nowtime}`, {
    method: 'GET'
  });
};

// 添加商品到购物车
export const addCartApi = (data) => {
  return request('/api1.0/cart', {
    method: 'POST',
    body: {
      action: data.action,
      itemid: data.itemid,
      number: data.number,
      type: data.type,
      param: data.param,
    }
  });
};

// 购物车删除商品
export const delCartApi = (data) => {
  return request('/api1.0/cart', {
    method: 'POST',
    body: {
      action: 'UPDATE',
      itemid: data.itemid,
      number: 0
    }
  });
};

// 修改购物车数量
export const updateCartApi = (data) => {
  return request('/api1.0/cart', {
    method: 'POST',
    body: {
      action: 'UPDATE',
      itemid: data.itemid,
      number: data.number,
    }
  });
};