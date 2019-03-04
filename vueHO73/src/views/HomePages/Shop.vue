<template>
  <div>
    <section class="container mt-5">
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
        <div class="col-md-3">
          <ol
            class="breadcrumb"
            style="background:none;"
          >
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shop">義賣商品</router-link>
            </li>
          </ol>
        </div>
        <div class="col-md-6 text-center">
          <div class="pro-title h3">義賣商品</div>
        </div>
        <div class="col-md-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="搜尋商品"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              data-toggle="tooltip"
              data-placement="top"
              title="按下 Enter 快速搜尋"
              v-model="filterSearch"
              @keyup.enter="filterTitle"
            >
            <div class="input-group-append ">
              <button
                class="btn btn-secondary"
                type="button"
                id="button-addon2"
                @click="filterTitle"
              ><i class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-2">
          <div class="list-group">
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              @click.prevent="filterPro('')"
            >全部商品</a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              v-for="category in categories"
              :key="category"
              :value="category"
              @click.prevent="filterPro(category)"
            >{{category}}</a>
          </div>
        </div>
        <!-- 右邊 "列表內容" 部分  -->
        <div class="col-md-10">
          <div class="row">
            <div
              class="col-md-4 mb-4"
              v-for="item in filterProducts"
              :key="item.id"
            >
              <div class="card border-0 box-shadow h-100">
                <div class="img-container">
                  <div
                    class="point img-scale"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"
                  >
                  </div>
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                  <h5 class="card-title">
                    <a
                      href="#"
                      class="text-dark"
                    >{{ item.title }}</a>
                  </h5>
                  <p class="card-text">{{ item.content}}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div
                      class="h5"
                      v-if="!item.price"
                    >{{ item.origin_price }} 元</div>
                    <del
                      class="h6"
                      v-if="item.price"
                    >原價 {{ item.origin_price }} 元</del>
                    <div
                      class="h5"
                      v-if="item.price"
                    >現在只要 {{ item.price }} 元</div>
                  </div>
                </div>
                <div class="card-footer border-top-0 d-flex">
                  <button
                    id="ho73-btn"
                    type="button"
                    class="btn btn-primary btn-md"
                  >
                    <!-- <i class="fas fa-spinner fa-spin"></i> -->
                    查看更多
                  </button>
                  <button
                    id="ho73-btn"
                    type="button"
                    class="btn btn-info btn-md ml-auto"
                    @click="addtoCart(item)"
                  >
                    <!-- <i class="fas fa-spinner fa-spin"></i> -->
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from "jquery";

  export default {
    name: "Shop",
    data() {
      return {
        products: [],
        filterProducts: [],
        filterSearch: "",
        isLoading: false
      };
    },
    methods: {
      getProducts() {
        const api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/products`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          vm.isLoading = false;
          vm.products = response.data.products;
          vm.filterProducts = vm.products;
          console.log(response);
        });
      },
      addtoCart(item, qty = 1) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const cart = {
          product_id: item.id,
          qty
        };
        vm.isLoading = true;
        this.$http.post(url, { data: cart }).then(response => {
          console.log(response);
          let msg = item.title + response.data.message;
          vm.$bus.$emit("message:push", msg, "info");
          vm.isLoading = false;
        });
      },
      filterPro(category) {
        const vm = this;
        if (category == "") {
          vm.filterProducts = vm.products;
        } else {
          vm.filterProducts = vm.products.filter(product => {
            return product.category == category;
          });
        }
      },
      filterTitle() {
        const vm = this;
        vm.filterProducts = vm.products.filter(product => {
          return product.title
            .toLowerCase()
            .includes(vm.filterSearch.toLowerCase());
        });
        vm.filterSearch = "";
      }
    },
    computed: {
      categories() {
        return Object.keys(
          this.products.reduce((Obj, { category }) => {
            if (!Obj[category]) {
              Obj[category] = 1;
            }
            console.log(Obj[category]);
            return Obj;
          }, {})
        );
      }
    },
    created() {
      this.getProducts();
    },
    mounted() {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  };
</script>

<style lang="scss" scoped>
  .img-center {
    text-align: center;
    zoom: 0.8;
  }
  #ho73-btn {
    color: #ffffff;
    &:hover {
      color: #fce38a;
    }
  }
  .box-shadow {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16);
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.24);
    }
  }
  .img-container {
    height: 200px;
    overflow: hidden;
  }
  .img-scale {
    background-size: cover;
    background-position: center center;
    height: 200px;
    transition: all 0.8s;
    &:hover {
      transform: scale(1.2);
    }
  }
  .point {
    cursor: pointer;
  }
</style>