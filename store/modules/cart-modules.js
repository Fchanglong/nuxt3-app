import { getCartApi, addCartApi } from "~/api/cart-api";

const state = () => ({
  items: [],
  isCartModalOpen: false,
  loading: false,
});

const getters = {
  cartCount: (state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
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
  // 添加到購物車（調用 API）
  async addToCart({ commit }, product) {
    // 構建 API 需要的數據格式
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
      if (cartRes.result === true || cartRes.code === 200) {
        //  將最新數據更新到 Vuex
        const cartItems = cartRes.item ? cartRes.item.slice(0, -1) : [];
        commit("SET_CART", cartItems);
      }
      commit("TOGGLE_CART_MODAL"); // 顯示購物車彈窗
      return { success: true, message: res.el.message || "已加入購物車" };
    } else {
      return {
        success: false,
        message: res.message || res.el.message || "加入購物車失敗",
      };
    }
  },

  // 獲取購物車數據
  async fetchCart({ commit }) {
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

  removeFromCart({ commit }, itemId) {
    commit("REMOVE_FROM_CART", itemId);
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
