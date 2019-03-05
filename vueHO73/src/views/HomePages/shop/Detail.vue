<template>
  <div>
    <div class="container mb-5">
      <loading :active.sync="isLoading">
        <div class="img-center">
          <img
            class="w-50"
            style=""
            src="@/assets/images/ho73Loading.gif"
            alt=""
          >
        </div>
      </loading>
      <div class="row">
        <div class="col-md-8">
          <ol class="breadcrumb bg-transparent pl-0 mt-2">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shop">義賣商品</router-link>
            </li>
            <li class="breadcrumb-item">
              {{ product.title }}
            </li>
          </ol>
        </div>
        <!-- <div class="col-md-4 text-center">
        </div> -->
      </div>

      <div class="row">
        <div class="col-md-7 mb-4">
          <img
            :src="product.imageUrl"
            class="img-fluid rounded"
            alt="img"
          >
        </div>
        <div class="col-md-5 bg-blue text-white pt-5">
          <span class="badge badge-warning float-right ">
            <div class="h5 mb-1">{{ product.category }}</div>
          </span>
          <span class="h3 font-weight-bold">{{ product.title }}
          </span>
          <h5 class="my-4 lh">{{product.content}}</h5>
          <p class="text-right">--{{product.description}}</p>
          <div class="d-flex justify-content-end align-items-end mb-3">
            <span
              class="h5 font-weight-bold mb-0"
              v-if="!product.price"
            >售價{{ product.origin_price }} 元</span>
            <del
              class="h6 mb-0"
              v-if="product.price"
            >原價 {{ product.origin_price }} 元</del>
            <div
              v-if="product.price"
              class="h5 ml-auto text-danger font-weight-bold mb-0"
            >
              <span>特價 {{ product.price }} 元</span>
            </div>
          </div>
          <select
            class="form-control"
            v-model="optionNum"
          >
            <option
              :value="num"
              v-for="num in 10"
              :key="num"
            >
              選購 {{num}} {{product.unit}}
            </option>
          </select>
          <div class="my-5 d-flex justify-content-between align-items-baseline">
            <span
              v-if="!product.price"
              class="pr-3 ml-1 h4"
            >合計 {{ optionNum * product.origin_price }} 元</span>
            <span
              v-else
              class="pr-3 ml-1 h4"
            >合計 {{ optionNum * product.price }} 元</span>
            <button
              type="button"
              class="btn btn-warning"
              @click="addtoCart(product,optionNum)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        product: {},
        optionNum: "1"
      };
    },
    methods: {
      addtoCart(item, qty = 1) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const cart = {
          product_id: item.id,
          qty
        };
        vm.isLoading = true;
        this.$http.post(url, { data: cart }).then(response => {
          // console.log(response);
          vm.$bus.$emit("updateCart");
          let msg = item.title + response.data.message;
          vm.$bus.$emit("message:push", msg, "info");
          vm.isLoading = false;
        });
      }
    },
    created() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${
        vm.$route.params.productId
      }`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        console.log(response);
        vm.isLoading = false;
      });
    }
  };
</script>

<style lang="scss" scoped>
  .img-center {
    text-align: center;
    zoom: 0.8;
  }
  .bg-blue {
    background: #1dba9d;
    border-radius: 5px;
  }
  .lh {
    line-height: 30px;
  }
  a {
    text-decoration: none;
  }
</style>
