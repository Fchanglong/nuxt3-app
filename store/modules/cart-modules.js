import { getCartApi, addCartApi, delCartApi } from "~/api/cart-api";
import { getCommoditySelectedSubApi } from "~/api/commodify-api";

const state = () => ({
  items: [],
  isCartModalOpen: false,
  loading: false,
});

const getters = {
  cartCount: (state) => {
    return state.items.reduce((total, item) => total + item.num, 0);
  },
  isEmpty: (state) => {
    return state.items.length === 0;
  },
  getItems: (state) => state.items,
  isModalOpen: (state) => state.isCartModalOpen,
  isLoading: (state) => state.loading,
};
//同步 只有mutations能直接修改state
const mutations = {
  SET_CART: (state, cartData) => {
    state.items = cartData || [];
  },

  SET_LOADING: (state, loading) => {
    state.loading = loading;
  },

  REMOVE_FROM_CART: (state, itemId) => {
    const index = state.items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      state.items.splice(index, 1);
    }
  },

  UPDATE_QUANTITY: (state, { itemId, quantity }) => {
    const item = state.items.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  },

  TOGGLE_CART_MODAL: (state) => {
    state.isCartModalOpen = !state.isCartModalOpen;
  },

  HIDE_CART_MODAL: (state) => {
    state.isCartModalOpen = false;
  },

  CLEAR_CART: (state) => {
    state.items = [];
  },
};
//異步 處理業務邏輯 調用 mutation修改 state
const actions = {
  async addToCart({ commit }, product) {
    const cartData = {
      action: product.action,
      itemid: product.id,
      number: product.quantity,
      type: product.type,
      param: product.param,
    };
    //  調用 addCartApi 添加到購物車
    const res = await addCartApi(cartData);
    // 根據實際響應結構判斷成功
    if (res.result === true && res.el.type === "success") {
      //  成功後調用 getCartApi 獲取最新購物車數據
      const cartRes = await getCartApi();
      //  將最新數據更新到 Vuex
      const cartItems = cartRes.item ? cartRes.item.slice(0, -1) : [];
      commit("SET_CART", cartItems);
    
      // 顯示購物車彈窗
      // commit("TOGGLE_CART_MODAL");
      return { success: true, message: res.el.message || "已加入購物車" };
    } else {
      return {
        success: false,
        message: res.message || res.el.message || "加入購物車失敗",
      };
    }
  },

  async removeFromCart({ commit }, itemId) {
    const items = await getCommoditySub(itemId);
    const res = await delCartApi({
      itemid: itemId,
      param: items,
    });
    if (res.result === true && res.el.type === "success") {
      // 成功後調用 getCartApi 獲取最新購物車數據
      const cartRes = await getCartApi();
      // 將最新數據更新到 Vuex
      const cartItems = cartRes.item ? cartRes.item.slice(0, -1) : [];
      commit("SET_CART", cartItems);
    }
  },

  // 獲取最新購物車數據
  async fetchLatestCart({ commit }) {
    try {
      commit("SET_LOADING", true);
      const res = await getCartApi();
      if (res.code === 200) {
        commit("SET_CART", res.data);
      }
    } catch (error) {
      console.error("獲取購物車失敗:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updateQuantity({ commit }, payload) {
    commit("UPDATE_QUANTITY", payload);
  },

  toggleCartModal({ commit }) {
    commit("TOGGLE_CART_MODAL");
  },

  hideCartModal({ commit }) {
    commit("HIDE_CART_MODAL");
  },

  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
//獲取商品選擇后的子商品信息
const getCommoditySub = async (itemId) => {
  const commodityInfo = await getCommoditySelectedSubApi(itemId);
  const subArr = commodityInfo.data.sub?.map((subItem) => ({
    item: subItem.isubid,
    num: parseInt(subItem.num) || 0,
  })) || [];
  const subFreeArr = commodityInfo.data.sub_free?.map((subItem) => ({
    item: subItem.isubid,
    num: parseInt(subItem.num_free) || 0,
  })) || [];
  
  return [...subArr, ...subFreeArr];
};