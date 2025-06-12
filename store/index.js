import { createStore } from "vuex";
import step from "./modules/step-modules";
import cart from "./modules/cart-modules";

export default createStore({
  modules: {
    step,
    cart,
  },
  // 只在客户端且非生产环境启用 strict
  strict:typeof window !== "undefined" && process.env.NODE_ENV !== "production",
});
