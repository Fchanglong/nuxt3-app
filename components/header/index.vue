<template>
  <header class="site-header">
    <!-- ========================================================= -->
    <!-- 桌面端顶部选项栏（语言/货币/登录/注册） – ≥768px 可见 -->
    <!-- ========================================================= -->
    <div class="top-bar" v-if="isDesktop">
      <div class="top-bar__right">
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- 桌面端主导航 + 移动端 Logo+购物车+汉堡按钮布局             -->
    <!-- ========================================================= -->
    <div class="main-nav">
      <!-- 左侧 Logo（桌面 & 移动都在左） -->
      <NuxtLink to="/" class="main-nav__logo">
        <img src="/logo.png" alt="網站 Logo" />
      </NuxtLink>

      <!-- 移动端：右侧并排 “购物车 + 汉堡按钮” – <768px 时可见 -->
      <div class="mobile-icons" v-if="!isDesktop">
        <!-- <NuxtLink to="/cart" class="cart-link">
          🛒<span class="cart-count">{{ cartCount }}</span>
        </NuxtLink> -->
          <button  class="cart-link " @click.stop="toggleCartModal">
            🛒<span class="cart-count">{{ cartCount }}</span>
          </button>
        <button
          class="main-nav__toggle"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span v-if="!mobileMenuOpen">&#9776;</span>
          <span v-else>&times;</span>
        </button>
      </div>

      <!-- 桌面端导航链接（宽度 ≥768px 可见） -->
      <!-- 注意这里加了 justify-center，让链接自动水平居中 -->
      <nav class="main-nav__links" v-if="isDesktop">
        <NuxtLink to="/" exact class="main-nav__link">首頁</NuxtLink>
        <NuxtLink to="/about" class="main-nav__link">關於masa</NuxtLink>
        <NuxtLink to="/products/categories" class="main-nav__link"
          >精選商品</NuxtLink
        >
        <NuxtLink to="/testimonials" class="main-nav__link">客戶心得</NuxtLink>

        <!-- “競品比較” 下拉 -->
        <div class="dropdown" ref="cmpWrapper">
          <button
            @click="compareMenuOpen = !compareMenuOpen"
            class="dropdown__button"
          >
            競品比較
            <span class="arrow"></span>
          </button>
          <ul v-show="compareMenuOpen" class="dropdown__menu">
            <li>
              <NuxtLink to="/compare/massage-chair" class="dropdown__item-link">
                masa vs 按摩椅
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/compare/fascia-gun" class="dropdown__item-link">
                masa vs 筋膜槍
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/compare/other-pads" class="dropdown__item-link">
                masa vs 其他按摩椅墊
              </NuxtLink>
            </li>
          </ul>
        </div>

        <NuxtLink to="/posts" class="main-nav__link">部落格首頁</NuxtLink>

        <!-- “常見問答” 下拉 -->
        <div class="dropdown" ref="faqWrapper">
          <button @click="faqMenuOpen = !faqMenuOpen" class="dropdown__button">
            常見問答
            <span class="arrow"></span>
          </button>
          <ul v-show="faqMenuOpen" class="dropdown__menu">
            <li>
              <NuxtLink to="/faq/general" class="dropdown__item-link"
                >常見問答</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/faq/manual" class="dropdown__item-link"
                >產品操作說明</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/faq/warranty" class="dropdown__item-link"
                >保固註冊</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/faq/shipping" class="dropdown__item-link"
                >運送政策</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/faq/return" class="dropdown__item-link"
                >30天試用與退換貨</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- 桌面端购物车放在最右侧 -->
        <div class="main-nav__cart">
          <!-- <NuxtLink to="/cart" class="cart-link">
            🛒<span class="cart-count">{{ cartCount }}</span>
          </NuxtLink> -->
            <button  class="cart-link " @click.stop="toggleCartModal">
            🛒<span class="cart-count">{{ cartCount }}</span>
          </button>
        </div>
      </nav>
    </div>

    <!-- ========================================================= -->
    <!-- 移动端遮罩层 + 左侧滑出抽屉菜单                           -->
    <!-- ========================================================= -->
    <div
      class="mobile-overlay"
      v-show="mobileMenuOpen"
      @click="mobileMenuOpen = false"
    ></div>

    <!-- 注意：这里改用 v-show 而非 v-if，让 transition 能正常触发 -->
    <transition name="slide">
      <div class="mobile-menu" v-show="mobileMenuOpen">
        <nav class="mobile-menu__links">
          <NuxtLink to="/" exact class="mobile-menu__link" @click="closeAll"
            >首頁</NuxtLink
          >
          <NuxtLink to="/about" class="mobile-menu__link" @click="closeAll"
            >關於masa</NuxtLink
          >
          <NuxtLink
            to="/products/categories"
            class="mobile-menu__link"
            @click="closeAll"
            >精選商品</NuxtLink
          >
          <NuxtLink
            to="/testimonials"
            class="mobile-menu__link"
            @click="closeAll"
            >客戶心得</NuxtLink
          >

          <!-- 移动端 “競品比較” 折叠菜单 -->
        
          <button
            class="mobile-menu__link"
            @click="mobileCompareOpen = !mobileCompareOpen"
          >
            競品比較
            <span class="arrow" :class="{ rotated: mobileCompareOpen }"></span>
          </button>
          <ul v-show="mobileCompareOpen" class="mobile-menu__sublist">
            <li>
              <NuxtLink
                to="/compare/massage-chair"
                class="mobile-menu__sublink"
                @click="closeAll"
                >masa vs 按摩椅</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/compare/fascia-gun"
                class="mobile-menu__sublink"
                @click="closeAll"
                >masa vs 筋膜槍</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/compare/other-pads"
                class="mobile-menu__sublink"
                @click="closeAll"
                >masa vs 其他按摩椅墊</NuxtLink
              >
            </li>
          </ul>

          <NuxtLink to="/posts" class="mobile-menu__link" @click="closeAll"
            >部落格首頁</NuxtLink
          >

          <!-- 移动端 “常見問答” 折叠菜单 -->
          <button
            class="mobile-menu__link"
            @click="mobileFaqOpen = !mobileFaqOpen"
          >
            常見問答
            <span class="arrow" :class="{ rotated: mobileFaqOpen }"></span>
          </button>
          <ul v-show="mobileFaqOpen" class="mobile-menu__sublist">
            <li>
              <NuxtLink
                to="/faq/general"
                class="mobile-menu__sublink"
                @click="closeAll"
                >常見問答</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq/manual"
                class="mobile-menu__sublink"
                @click="closeAll"
                >產品操作說明</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq/warranty"
                class="mobile-menu__sublink"
                @click="closeAll"
                >保固註冊</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq/shipping"
                class="mobile-menu__sublink"
                @click="closeAll"
                >運送政策</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq/return"
                class="mobile-menu__sublink"
                @click="closeAll"
                >30天試用與退換貨</NuxtLink
              >
            </li>
          </ul>

          <!-- <NuxtLink
            to="/account/login"
            class="mobile-menu__link"
            @click="closeAll"
            >會員登入</NuxtLink
          > -->
          <!-- <NuxtLink
            to="/account/register"
            class="mobile-menu__link"
            @click="closeAll"
            >新用戶註冊</NuxtLink
          > -->
          <NuxtLink to="/cart" class="mobile-menu__link" @click="closeAll"
            >購物車 ({{ cartCount }})</NuxtLink
          >
       
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>

import { useStore } from 'vuex'
const store = useStore()
const toggleCartModal = () => store.dispatch('cart/toggleCartModal')
// ==============================
// 1. 响应式判断：宽度 ≥768px 为桌面端
// ==============================
const isDesktop = ref(true);
const checkScreen = () => {
  isDesktop.value = window.innerWidth >= 768;
};
onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen,{ passive: true });
});

// ==============================
// 2. 顶部下拉：语言/货币 (桌面端)
// ==============================
const langMenuOpen = ref(false);
const currencyMenuOpen = ref(false);
const currentLang = ref("zh");
const currentCurrency = ref("TWD");
const currentLangLabel = computed(() =>
  currentLang.value === "zh" ? "繁體中文" : "English"
);

const setLang = (lang) => {
  currentLang.value = lang;
  langMenuOpen.value = false;
};
const setCurrency = (cur) => {
  currentCurrency.value = cur;
  currencyMenuOpen.value = false;
};
const toggleLangMenu = () => {
  langMenuOpen.value = !langMenuOpen.value;
};
const toggleCurrencyMenu = () => {
  currencyMenuOpen.value = !currencyMenuOpen.value;
};

// 点击空白处关闭下拉
const clickOutside = (elRef, callback) => {
  const handler = (e) => {
    if (!elRef.value || elRef.value.contains(e.target)) return;
    callback();
  };
  onMounted(() => window.addEventListener("click", handler,{ passive: true }));
};
const langWrapper = ref(null);
const curWrapper = ref(null);
clickOutside(langWrapper, () => (langMenuOpen.value = false));
clickOutside(curWrapper, () => (currencyMenuOpen.value = false));

// ==============================
// 3. 桌面端下拉：競品比較 / 常見問答
// ==============================
const compareMenuOpen = ref(false);
const faqMenuOpen = ref(false);
const cmpWrapper = ref(null);
const faqWrapper = ref(null);
clickOutside(cmpWrapper, () => (compareMenuOpen.value = false));
clickOutside(faqWrapper, () => (faqMenuOpen.value = false));

// ==============================
// 4. 移动端菜单：左侧滑出 & 折叠
// ==============================
const mobileMenuOpen = ref(false);
const mobileCompareOpen = ref(false);
const mobileFaqOpen = ref(false);

// 关闭所有移动端子菜单 & 自身
const closeAll = () => {
  mobileMenuOpen.value = false;
  mobileCompareOpen.value = false;
  mobileFaqOpen.value = false;
};

// ==============================
// 5. 购物车数量示例 (可替换为 Pinia/Store 中的实际值)
// ==============================
const cartCount = computed(() => store.getters['cart/cartCount'] || 0)
</script>

<style scoped>
/* ===========================
   整体 Header 容器
   =========================== */
.site-header {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background: #191919;     /* 深夜蓝色背景（可根据官网实际稍作微调） */
  z-index: 999;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* ===========================
   顶部选项栏（桌面端 ≥768px 可见）
   =========================== */
.top-bar {
  height: 1.5rem;        /* 48px */
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 1rem;  /* 大约 4px 16px */
  background: #191919;    /* 比主导航再深一点 */
  font-size: 14px;        /* 统一字体大小 */
  color: #cfd8dc;         /* 浅灰白 (#cfd8dc) */
}

.top-bar__right {
  display: flex;
  align-items: center;
}

.top-bar__link {
  margin-left: 1.5rem;     /* 24px */
  color: #cfd8dc;          /* 浅灰白 */
  text-decoration: none;
  transition: color 0.2s;
  font-size: 14px;
}
.top-bar__link:hover {
  color: #ffffff;
}

/* ===========================
   主导航：Logo + 链接 + 购物车
   =========================== */
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;   /* 大约 12px 16px */
}

/* Logo 区域（始终在左） */
.main-nav__logo img {
  height: 2.5rem;         /* 40px */
  object-fit: contain;
}

/* --------------------------------
   移动端：右侧并排 “购物车 + 汉堡按钮”
   <768px 时可见
   -------------------------------- */
.mobile-icons {
  display: flex;
  align-items: center;
  gap: 1rem;             /* 16px */
}
.cart-link {
  position: relative;
  color: #cfd8dc;
  text-decoration: none;
  font-size: 1.25rem;    /* 20px */
  transition: color 0.2s;
}
.cart-link:hover {
  color: #ffffff;
}
.cart-count {
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  background: #e53935;   /* 红色 */
  color: #ffffff;
  border-radius: 9999px;
  padding: 0 4px;
  font-size: 10px;
  font-weight: bold;
}

/* 汉堡按钮 (仅在 <768px 可见) */
.main-nav__toggle {
  background: none;
  border: none;
  font-size: 1.5rem;      /* 24px */
  color: #cfd8dc;
  cursor: pointer;
  transition: color 0.2s;
}
.main-nav__toggle:hover {
  color: #ffffff;
}

/* --------------------------------
   桌面端：导航链接 (≥768px 可见)，水平居中
   -------------------------------- */
.main-nav__links {
  display: flex;
  align-items: center;
  justify-content: center;  /* 水平居中 */
  flex: 1;                  /* 抢占剩余空间 */
  gap: 1.5rem;              /* 24px 链接间隔 */
}

/* 单个导航链接基础样式 */
.main-nav__link {
  position: relative;
  color: #cfd8dc;           /* 浅灰白 */
  text-decoration: none;
  padding: 0 4px;           /* 左右 4px 微调 */
  font-size: 14px;
  line-height: 1.7;         /* 让文字垂直居中感更好 */
  font-weight: 500;
  transition: color 0.2s;
}
.main-nav__link:hover {
  color: #ffffff;
}

/* 下划线动画：中间 → 两端 延伸 */
.main-nav__link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -2px;            
  width: 100%;
  height: 4px;
  background: #ac886b;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease-out;
}
.main-nav__link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* 当前路由高亮 (NuxtLink 自动添加 .router-link-active) */
.main-nav__link.router-link-active {
  color: #ffffff;
}
.main-nav__link.router-link-active::after {
  /* transform: translateX(-50%) scaleX(1); */
}

/* --------------------------------
   购物车图标 (桌面 & 移动保持)
   -------------------------------- */
.main-nav__cart {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
}
.main-nav__cart .cart-link {
  margin-left: 1.5rem;     /* 桌面端最右侧留空 24px */
}

/* ===========================
   下拉菜单（桌面端多处使用）
   =========================== */
.dropdown {
  position: relative;
  display: inline-block;
  /* margin-left: 1.5rem;      24px */
}

.dropdown__button {
  background: none;
  border: none;
  color: #cfd8dc;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0 4px;           /* 微调左右内边距 */
  line-height: 1.7;
}
.dropdown__button:hover {
  color: #ffffff;
}

/* 下拉按钮的下划线动画 */
.dropdown__button::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 100%;
  height: 4px;
  background: #ac886b;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease-out;
}
.dropdown__button:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* 箭头三角（向下） */
.arrow {
  display: inline-block;
  margin-left: 4px;
  border: 5px solid transparent;
  border-top-color: #cfd8dc; /* 淡灰色 */
  width: 0;
  height: 0;
  transition: transform 0.2s, border-top-color 0.2s;
}
.dropdown__button:hover .arrow {
  border-top-color: #ffffff;
}
.arrow.rotated {
  transform: rotate(180deg);
}

/* 下拉列表容器 */
.dropdown__menu {
  position: absolute;
  top: 100%;
  margin-top: 4px;
  background: #191919;         /* 与 .site-header 一致的背景色 */
  border: 1px solid #191919;   /* 深色边框 */
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 160px;            /* 160px 最合适，太窄会折行 */
  z-index: 1000;
  padding: 8px 0;              /* 上下内边距 8px */
  list-style: none;            /* 去掉默认圆点 */
}

/* 下拉菜单里的项目：按钮风格 */
.dropdown__item {
  display: block;
  width: 100%;
  padding: 8px 12px;           /* 上下 8px，左右 12px */
  background: none;
  border: none;
  color: #cfd8dc;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.dropdown__item:hover {
  background: #273742;         /* 更深一点的背景高亮 */
  color: #ffffff;
  border-radius: 4px;
}

/* 下拉菜单里的项目：NuxtLink 风格 */
.dropdown__item-link {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 8px 12px;
  color: #cfd8dc;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.dropdown__item-link:hover {
  background: #273742;
  color: #ffffff;
  border-radius: 4px;
}

/* ===========================
   移动端遮罩层 + 侧出菜单
   =========================== */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 995;
}

/* 侧出菜单本体 */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 80vw;
  max-width: 300px;
  height: 100vh;
  background: #1c2b3c;
  z-index: 996;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  /* ’transform: translateX(-100%)‘ 由 transition 控制，不在这里写 */
}

/* 滑入滑出动画 */
.slide-enter-active {
  transition: transform 0.2s ease-out;
}
.slide-leave-active {
  transition: transform 0.2s ease-in;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}

/* 侧栏内部链接列表 */
.mobile-menu__links {
  display: flex;
  flex-direction: column;
  padding: 1rem;       /* 16px */
  gap: 0.75rem;        /* 12px 垂直间距 */
}

.mobile-menu__link {
  color: #cfd8dc;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  padding: 8px 12px;   /* 上下 8px，左右 12px */
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.mobile-menu__link:hover {
  background: #273742;
  color: #ffffff;
  border-radius: 4px;
}

.mobile-menu__sublink {
  color: #9fa6ad;       /* 更淡的灰色 */
  text-decoration: none;
  padding: 8px 24px;    /* 上下 8px，左右 24px（缩进） */
  font-size: 14px;
  transition: color 0.2s, background 0.2s;
}
.mobile-menu__sublink:hover {
  background: #273742;
  color: #ffffff;
  border-radius: 4px;
}

.mobile-menu__sublist {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  gap: 4px;             /* 4px 的垂直间距 */
}

/* ===========================
   响应式：切换 Desktop vs Mobile
   =========================== */
/* 宽度 ≥768px：显示桌面端 (top-bar + main-nav__links)，隐藏移动端 */
@media (min-width: 768px) {
  .top-bar {
    display: flex;
  }
  .main-nav__toggle,
  .mobile-icons,
  .mobile-menu,
  .mobile-overlay {
    display: none;
  }
}

/* 宽度 <768px：隐藏桌面端 (top-bar + main-nav__links + main-nav__cart)，显示移动端 */
@media (max-width: 767px) {
  .top-bar,
  .main-nav__links,
  .main-nav__cart {
    display: none;
  }
  .mobile-icons {
    display: flex;
  }
}
</style>

