import request from "../utils/request.js";

//保存用戶輸入的表單信息
export const saveOrderFormInfoApi = (data) => {
  return request("/api0/cus/api/save-cus-data", {
    method: "POST",
    body: data,
  });
};

//獲得支付方式
export const getPaymentApi = () => {
  return request("/api1.0/payment");
};

//獲得物流
export const getLogisticsApi = () => {
  return request("/api1.0/logistics");
};

//創建訂單(提交訂單后返回訂單編號)
export const creatOrderApi = (data) => {
  return request("/api0/cus/api/create-order", {
    method: "POST",
    body: data,
  });
};

//提交發票信息
export const submitInvoiceApi = (o, data) => {
  return request(`/api0/cus/ec-invoice/${o}`, {
    method: "POST",
    body: data,
  });
};

//提交支付信息
export const submitPayModeApi = (data) => {
  return request(`/api0/cus/api/payment/pay-mode`, {
    method: "POST",
    body: data,
  });
};

//獲取訂單詳情
export const getOrderDetailApi = (o) => {
  return request(`/api1.0/order?order_num=${o}`);
};

//根據手機號獲得訂單號
export const getOrderNumByPhoneApi = (phone) => {
  return request(`/api1.0/order?phone=${phone}`);
};

//獲取提交支付后的支付返回地址
export const getPaymentReturnUrlApi = (param) => {
  return request(`/api1.0/cus/api/select-payment?order_num=${param.order_num}&redirect_f2e_href=${param.redirect_f2e_href}`);
};

//支付後發送郵箱給用戶
export const sendNotificationApi = (data) => { 
  return $fetch("https://sapi.yf.support/api/telegram-service/send-notification", {
    method: "POST",
    body: data,
  });
}