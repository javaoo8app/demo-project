import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import productsModules from "./products";
import alertModules from "./alert";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    categories: [],
    cart: {},
    cartNum: 0
  },
  actions: {
    // payload 載荷
    updateLoading(context, status) {
      context.commit("LOADING", status);
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      axios.get(api).then(response => {
        // console.log(response);
        context.commit("CART", response.data.data);
      });
    },
    removeCartItem(context, item) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart/${item.id}`;
      context.commit("LOADING", true);
      axios.delete(api).then(response => {
        // console.log(response);
        context.dispatch("getCart");
        let msg = response.data.message + ":" + item.product.title;
        // console.log(msg);
        context.dispatch("updateMessage", { message: msg, status: "info" });
        context.commit("LOADING", false);
      });
    },
    addtoCart(context, { item, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      const cart = {
        product_id: item.id,
        qty
      };
      context.commit("LOADING", true);
      axios.post(url, { data: cart }).then(response => {
        // console.log(response);
        context.dispatch("getCart");
        let msg = item.title + response.data.message;
        context.dispatch("updateMessage", { message: msg, status: "info" });
        context.commit("LOADING", false);
      });
    }
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload;
      state.cartNum = payload.carts.length;
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    cart(state) {
      return state.cart;
    },
    cartNum(state) {
      return state.cartNum;
    }
  },
  modules: {
    productsModules,
    alertModules
  }
});
