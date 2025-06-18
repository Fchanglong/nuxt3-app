import { createStore } from "vuex";
import step from "./modules/step-modules";
import cart from "./modules/cart-modules";
import order from "./modules/order-modules";
export default createStore({
  modules: {
    step,
    cart,
    order
  },
  // 只在客户端且非生产环境启用 strict
  strict:typeof window !== "undefined" && process.env.NODE_ENV !== "production",
});
