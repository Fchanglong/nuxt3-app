import {
  creatOrderApi,
  submitInvoiceApi,
  getPaymentApi,
  submitPaymentApi,
} from "@/api/order-api.js";
const state = () => ({
  //訂單表單信息
  orderFormInfo: {
    address: "",
    email: "",
    name: "",
    note: "",
    phone: "",
  },
  //返回后的訂單編號信息
  orderInfo: {
    o: "",
    total: 0,
    u: "",
  },
  //發票表單信息
  invoiceFormInfo: {
    company: "",
    email: "",
    identifier: "",
    type: 1,
  },
  //付款方式列表
  paymentList: [],
  //選中的支付方式
  selectedPayment: {
    id: 0,
    name: "",
    pay_mode: "",
  },
});
const getters = {
  getOrderFormInfo: (state) => state.orderFormInfo,
  getOrderInfo: (state) => state.orderInfo,
  getInvoiceFormInfo: (state) => state.invoiceFormInfo,
  getPaymentList: (state) => state.paymentList,
  getSelectedPayment: (state) => state.selectedPayment,
};
const actions = {
  updateOrderFormInfo({ commit }, payload) {
    commit("SET_ORDER_FORM_INFO", payload);
  },

  updateInvoiceFormInfo({ commit }, payload) {
    commit("SET_INVOICE_FORM_INFO", payload);
  },

  updatePaymentList({ commit }, payload) {
    commit("SET_PAYMENT_LIST", payload);
  },
  updateSelectedPayment({ commit }, payload) {
    commit("SET_SELECTED_PAYMENT", payload);
  },
  //提交訂單(返回訂單編號)
  async createOrder({ commit }, payload) {
    const rse = await creatOrderApi(payload);
    commit("SET_ORDER_INFO", rse);
  },
  // 根據訂單編號提交發票信息
  async submitInvoice({ state }) {
    const orderInfo = state.orderInfo; // 獲取訂單信息
    const invoiceInfo = state.invoiceFormInfo; // 獲取發票信息
    await submitInvoiceApi(orderInfo.o, invoiceInfo);
  },
  //提交支付信息
  async submitPayment({ state }) {
    const orderInfo = state.orderInfo; // 獲取訂單信息
    const paymentInfo = state.selectedPayment; // 獲取支付信息
    const data = {
      order_num: orderInfo.o, // 訂單編號
      type: paymentInfo.pay_mode, // 支付方式
    };
    await submitPaymentApi(data);
  },
  //獲取支付方式
  async getPaymentList({ commit }) {
    // 調用 API，使用內部數據
    const { data } = await getPaymentApi();
    const paymentInfos = data.map((item) => ({
      id: item.paymentid,
      name: item.alias,
      pay_mode: item.pay_mode,
    }));
    commit("SET_PAYMENT_LIST", paymentInfos);
  },
};
const mutations = {
  SET_ORDER_FORM_INFO(state, payload) {
    state.orderFormInfo = { ...state.orderFormInfo, ...payload };
  },
  SET_ORDER_INFO(state, payload) {
    state.orderInfo = { ...state.orderInfo, ...payload };
  },
  SET_INVOICE_FORM_INFO(state, payload) {
    state.invoiceFormInfo = { ...state.invoiceFormInfo, ...payload };
  },
  SET_PAYMENT_LIST(state, payload) {
    state.paymentList = payload;
  },
  SET_SELECTED_PAYMENT(state, payload) {
    state.selectedPayment = { ...state.selectedPayment, ...payload };
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
