//官方元件
import Vue from "vue";
import VueRouter from "vue-router";

//自訂元件
import Login from "@/views/Login";
import Home from "@/views/Home";
import HomePage from "@/views/HomePages/HomePage";
import News from "@/views/News/News";
import Shop from "@/views/HomePages/Shop";
import Detail from "@/views/HomePages/shop/Detail";
import CustomerOrder from "@/views/HomePages/shop/CustomerOrder";
import CustomerCheckout from "@/views/HomePages/shop/CustomerCheckout";
import Dashboard from "@/views/Dashboard";
import Products from "@/views/Dashboard/Products";
import ProductList from "@/views/Dashboard/products/ProductList";
import OrderList from "@/views/Dashboard/products/OrderList";
import Coupons from "@/views/Dashboard/products/Coupons";

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: "active",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/login", //對應的虛擬路徑
      name: "Login", //元件呈現的名稱
      component: Login //對應的元件
    },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      // name: "Home",
      component: Home,
      children: [
        {
          path: "",
          name: "HomePage",
          component: HomePage
        },
        {
          path: "News",
          name: "News",
          component: News
        },
        {
          path: "shop",
          name: "Shop",
          component: Shop
        },
        {
          path: "detail/:productId",
          name: "Detail",
          component: Detail
        },
        {
          path: "customer_order",
          name: "CustomerOrder",
          component: CustomerOrder
        },
        {
          path: "customer_checkout/:orderId",
          name: "CustomerCheckout",
          component: CustomerCheckout
        }
      ]
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "products",
          name: "Products",
          component: Products,
          meta: { requiresAuth: true },
          children: [
            {
              path: "productList",
              name: "ProductList",
              component: ProductList,
              meta: { requiresAuth: true }
            },
            {
              path: "orderList",
              name: "OrderList",
              component: OrderList,
              meta: { requiresAuth: true }
            },
            {
              path: "coupons",
              name: "Coupons",
              component: Coupons,
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
