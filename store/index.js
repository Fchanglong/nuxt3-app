import { createStore } from "vuex";
import step from "./modules/step-modules";
import cart from "./modules/cart-modules";
import order from "./modules/order-modules";

const store = createStore({
  modules: {
    step,
    cart,
    order
  },
  strict: typeof window !== "undefined" && process.env.NODE_ENV !== "production",
});


export default store;

// 手動恢復 導出恢復狀態的函數
export const restoreState = () => {
  if (typeof window !== 'undefined') {
    const savedState = sessionStorage.getItem('vuex')
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        store.replaceState({
          ...store.state,
          ...parsedState
        })
        return true
      } catch (e) {
        console.error('恢復狀態失敗:', e)
        sessionStorage.removeItem('vuex')
      }
    }
  }
  return false
}

// 設置狀態監聽
export const setupStatePersistence = () => {
  if (typeof window !== 'undefined') {
    store.subscribe((mutation, state) => {
      try {
        const stateToSave = {
          cart: state.cart,
          order: state.order,
          step: state.step
        }
        sessionStorage.setItem('vuex', JSON.stringify(stateToSave))
      } catch (e) {
        console.error('保存狀態失敗:', e)
      }
    })
  }
}