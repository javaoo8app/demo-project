import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/login", //對應的虛擬路徑
      name: "Login", //元件呈現的名稱
      component: () => import("@/views/Login") //對應的元件
    },
    {
      path: "/",
      // name: "Home",
      component: Home,
      children: [
        {
          path: "",
          name: "HomePage",
          component: () => import("@/views/HomePages/HomePage")
        },
        {
          path: "shop",
          name: "Shop",
          component: () => import("@/views/HomePages/Shop")
        },
        {
          path: "detail/:productId",
          name: "Detail",
          component: () => import("@/views/HomePages/shop/Detail")
        },
        {
          path: "customer_order",
          name: "CustomerOrder",
          component: () => import("@/views/HomePages/shop/CustomerOrder")
        },
        {
          path: "customer_checkout/:orderId",
          name: "CustomerCheckout",
          component: () => import("@/views/HomePages/shop/CustomerCheckout")
        }
      ]
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: () => import("@/views/Dashboard"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "products",
          // name: "Products",
          component: () => import("@/views/Dashboard/Products"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "",
              name: "ProductList",
              component: () => import("@/views/Dashboard/products/ProductList"),
              meta: { requiresAuth: true }
            },
            {
              path: "orderList",
              name: "OrderList",
              component: () => import("@/views/Dashboard/products/OrderList"),
              meta: { requiresAuth: true }
            },
            {
              path: "coupons",
              name: "Coupons",
              component: () => import("@/views/Dashboard/products/Coupons"),
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition;
    } else if (to.hash) {
      const position = {};
      position.selector = to.hash;
      if (document.querySelector(to.hash)) {
        position.offset = { y: 100 };
        return position;
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
