const state = () => ({
  items: [
    {
      id: 1,
      name: '替換布套  (Joy Pro 智慧按摩椅墊 適用)',
      image: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/200x200f.webp?source_format=png',
      selectedColor: '紅色',
      cuurentPrice: 1990,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Joy 智慧按摩椅墊',
      color: '銀河灰',
      price: 880,
      originalPrice: 1080,
      quantity: 1,
      image: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6323096f9514ce4eec4c1308/800x.webp?source_format=jpg'
    }
  ],
  isCartModalOpen: false
})

const getters = {
  cartCount: state => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },
  isEmpty: state => {
    return state.items.length === 0
  },
  getItems: state => state.items,
  isModalOpen: state => state.isCartModalOpen
}

const mutations = {
  ADD_TO_CART: (state, product) => {
    const existingItem = state.items.find(item =>
      item.id === product.id &&
      item.selectedColor === product.selectedColor
    )

    if (existingItem) {
      existingItem.quantity += product.quantity
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        cuurentPrice: product.price,
        image: product.image,
        selectedColor: product.selectedColor,
        quantity: product.quantity,
      })
    }
    state.isCartModalOpen = true
  },
  
  REMOVE_FROM_CART: (state, itemId) => {
    const index = state.items.findIndex(item => item.id === itemId)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  },
  
  UPDATE_QUANTITY: (state, { itemId, quantity }) => {
    const item = state.items.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  },
  
  TOGGLE_CART_MODAL: (state) => {
    state.isCartModalOpen = !state.isCartModalOpen
  },
  
  HIDE_CART_MODAL: (state) => {
    state.isCartModalOpen = false
  },
  
  CLEAR_CART: (state) => {
    state.items = []
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  
  removeFromCart({ commit }, itemId) {
    commit('REMOVE_FROM_CART', itemId)
  },
  
  updateQuantity({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload)
  },
  
  toggleCartModal({ commit }) {
    commit('TOGGLE_CART_MODAL')
  },
  
  hideCartModal({ commit }) {
    commit('HIDE_CART_MODAL')
  },
  
  clearCart({ commit }) {
    commit('CLEAR_CART')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}