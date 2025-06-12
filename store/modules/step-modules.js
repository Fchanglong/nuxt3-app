const state = () => ({
  currentStep: 1
})

const getters = {
  getCurrentStep: state => state.currentStep
}

const mutations = {
  SET_CURRENT_STEP: (state, step) => {
    state.currentStep = step
  }
}

const actions = {
  setCurrentStep({ commit }, step) {
    commit('SET_CURRENT_STEP', step)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}