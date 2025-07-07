import { getWebstiteApi } from "@/api/website-api.js";
const state = () => ({
  website: {},
});

const mutations = {
  SET_WEBSITE_DATA(state, payload) {
    state.website = payload;
  },
};

const actions = {
  async fetchWebsiteData({ commit }) {
    try {
      const response = await getWebstiteApi();
      // 使用 reduce 將數據轉換為對象形式
      const formattedData = response.data
      commit("SET_WEBSITE_DATA", formattedData);
    } catch (error) {
      console.error("獲取網站數據失敗:", error);
    }
  },
};

const getters = {
  getWebsiteSeo: (state) => {
    return state.website?.seo || {};
  },
  getWebsiteData: (state) => {
    return state.website;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
