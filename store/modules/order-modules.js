const state = () => ({
  orderInfo: {
    address: '',
    email: '',
    name: '',
    note: '',
    phone: '',
  }
})
const getters = {
  getOrderInfo: state => state.orderInfo
}
const actions = {
  updateOrderInfo({ commit }, payload) {
    commit('SET_ORDER_INFO', payload)
  }
}
const mutations = {
  SET_ORDER_INFO(state, payload) {
    state.orderInfo = { ...state.orderInfo, ...payload }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}