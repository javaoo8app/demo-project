//官方元件
import Vue from "vue";
import VueRouter from "vue-router";

//自訂元件
// import HelloWorld from "@/components/HelloWorld";
import Login from "@/views/Login";
import Home from "@/views/Home";

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
    }
  ]
});
