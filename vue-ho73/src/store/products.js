import axios from "axios";
export default {
  // state屬於模組區域變數
  // actions, mutations, getters 是屬於全域變數
  namespaced: true, // actions, mutations, getters 是屬於區域變數
  state: {
    products: []
  },
  actions: {
    getProducts(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products`;
      context.commit("LOADING", true, { root: true });
      axios.get(api).then(response => {
        context.commit("LOADING", false, { root: true });
        context.commit("PRODUCTS", response.data.products);
        console.log("取得商品列表", response);
      });
    },
    removeCartItem(context, item) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart/${item.id}`;
      axios.delete(api).then(response => {
        // console.log(response);
        context.dispatch("getCart");
        // let msg = response.data.message + ":" + item.product.title;
        // vm.$bus.$emit("updateCart");
        // vm.$bus.$emit("message:push", msg, "info");
      });
    }
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    }
  },
  getters: {
    products(state) {
      return state.products;
    }
  }
};
