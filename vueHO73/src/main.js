// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import VeeValidate, { Validator } from "vee-validate";
import "vue-loading-overlay/dist/vue-loading.css";
import zhTWValidate from "vee-validate/dist/locale/zh_TW";
import App from "./App";
import router from "./router";

import "bootstrap";
import "./bus";
import currencyFilter from "./filters/currency";
import dateFilter from "./filters/date";
import "./bus";

Vue.use(VueAxios, axios);
Vue.use(
  VeeValidate,
  {
    events: "input|blur"
  },
  { locale: "zh_TW" }
);
Validator.localize("zh_TW", zhTWValidate);
Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.filter("date", dateFilter);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router
});

router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  if (to.meta.requiresAuth) {
    // console.log("這裡需要驗證");
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      // console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});
