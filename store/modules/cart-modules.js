import { getCartApi, addCartApi, delCartApi } from "~/api/cart-api";
import { getCommoditySelectedSubApi } from "~/api/commodify-api";

const state = () => ({
  //購物車内商品數組
  items: [],
  isCartModalOpen: false,
  //運費
  shipping: "0",
  //總計
  total: "0",
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
  getShipping: (state) => state.shipping,
  getTotal: (state) => state.total,
  getSubtotal: (state) => {
    return state.items.reduce(
      (total, item) => total + (parseFloat(item.total) || 0),
      0
    );
  },
};

const mutations = {
  SET_CART: (state, cartData) => {
    state.items = cartData || [];
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

  SET_SHIPPING: (state, shipping) => {
    state.shipping = shipping;
  },

  SET_TOTAL: (state, total) => {
    state.total = total;
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
      //  將最新數據更新到 Vuex
      await updateCartData(commit);
      // 顯示購物車彈窗
      // commit("TOGGLE_CART_MODAL");
      return { success: true, message:  "已加入購物車" };
    } else {
      return {
        success: false,
        message: res.message || "加入購物車失敗",
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
      // 將最新數據更新到 Vuex
      updateCartData(commit);
    }
  },

  // 獲取最新購物車數據
  async fetchLatestCart({ commit }) {
    try {
      updateCartData(commit);
    } catch (error) {
      console.error("獲取購物車失敗:", error);
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
  const subArr =
    commodityInfo.data.sub?.map((subItem) => ({
      item: subItem.isubid,
      num: parseInt(subItem.num) || 0,
    })) || [];
  const subFreeArr =
    commodityInfo.data.sub_free?.map((subItem) => ({
      item: subItem.isubid,
      num: parseInt(subItem.num_free) || 0,
    })) || [];
  return [...subArr, ...subFreeArr];
};
// 更新數據
const updateCartData = async (commit) => {
  try {
    const res = await getCartApi();
    // 添加安全檢查
    const shipping =
      res.item && res.item.length > 0
        ? res.item[res.item.length - 1].total 
        : "0";
    const total = res.total || "0";
    const cartItems = res.item && res.item.length > 1 ? res.item.slice(0, -1) : [];

    commit("SET_SHIPPING", shipping);
    commit("SET_TOTAL", total);
    commit("SET_CART", cartItems);

    return { success: true, data: { shipping, total, cartItems } };
  } catch (error) {
    console.error("更新購物車數據失敗:", error);
    return { success: false, error };
  }
};
