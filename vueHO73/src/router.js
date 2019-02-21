//官方元件
import Vue from "vue";
import VueRouter from "vue-router";

//自訂元件
// import HelloWorld from "@/components/HelloWorld";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Dashboard from "@/views/Dashboard";
import Products from "@/views/Dashboard/Products";
import ProductList from "@/views/Dashboard/products/ProductList";
import OrderList from "@/views/Dashboard/products/OrderList";

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
      name: "Home",
      component: Home
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
            }
            // {
            //   path: "coupons",
            //   name: "Coupons",
            //   component: Coupons
            // }
          ]
        }
      ]
    }
  ]
});
