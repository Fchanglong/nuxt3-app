import request from "../utils/request.js";

//獲得支付方式
export const getPaymentApi = () => {
 return request("/api1.0/payment");
};
//獲得物流
export const getLogisticsApi = () => {
  return request("/api1.0/logistics");
};
