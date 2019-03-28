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
      <ShoppingCart class="d-lg-none" />
      <div class="row">
        <div class="d-none d-md-block col-md-3">
          <ol class="breadcrumb bg-transparent pl-0">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shop">義賣商品</router-link>
            </li>
          </ol>
        </div>
        <div class="col-md-6 text-center">
          <div class="text-secondary font-weight-bold h3">義賣商品</div>
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
      <!-- 行動版選單 -->
      <div class="container">
        <div class="row">
          <select
            id="searchBar"
            class="d-lg-none my-3 col-sm-12"
            v-model="searchText"
            @change="onChange"
          >
            <option
              value=""
              selected
            >全部商品</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >{{category}}</option>
          </select>
        </div>
      </div>
      <div class="row mt-4">
        <!-- 左側選單 -->
        <div class="d-none d-lg-block col-md-2">
          <div class="list-group">
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              @click.prevent="searchText = '', filterSearch = ''"
              :class="{ 'active' : (searchText === '' && filterSearch === '')}"
            >全部商品</a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              v-for="category in categories"
              :key="category"
              @click.prevent="searchText = category, filterSearch = ''"
              :class="{ 'active' : (searchText === category  && filterSearch === '')}"
            >{{category}}</a>
          </div>
        </div>
        <!-- 右邊 "列表內容" 部分 供左側選擇使用  -->
        <div
          v-if="filterSearch === ''"
          class="col-lg-10"
        >
          <div class="row">
            <div
              class="col-md-4 mb-4"
              v-for="item in filterData"
              :key="item.id"
            >
              <div class="card border-0 box-shadow h-100">
                <div class="img-container">
                  <div
                    class="point img-scale"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"
                    @click="goDetail(item.id)"
                  >
                  </div>
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                  <h5 class="card-title">
                    <a
                      href="#"
                      class="text-dark font-weight-bold"
                      @click.prevent="goDetail(item.id)"
                    >{{ item.title }}</a>
                  </h5>
                  <p class="card-text">{{ item.content}}</p>
                  <div class="d-flex justify-content-end align-items-end">
                    <span
                      class="h5 font-weight-bold mb-0"
                      v-if="!item.price"
                    >售價{{ item.origin_price | currency }} 元</span>
                    <del
                      class="h6 mb-0 d-sm-none d-lg-flex"
                      v-if="item.price"
                    >原價 {{ item.origin_price | currency }} 元</del>
                    <div
                      v-if="item.price"
                      class="h5 ml-auto text-danger font-weight-bold mb-0"
                    >
                      <span>特價 {{ item.price | currency }} 元</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer border-top-0 d-flex">
                  <button
                    id="ho73-btn"
                    type="button"
                    class="btn btn-primary btn-md"
                    @click="goDetail(item.id)"
                  >
                    查看更多
                  </button>
                  <button
                    id="ho73-btn"
                    type="button"
                    class="btn btn-info btn-md ml-auto"
                    @click="addtoCart(item)"
                  >
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右邊 "列表內容" 部分 供搜尋使用  -->
        <div
          v-else
          class="col-lg-10"
        >
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
                    @click="goDetail(item.id)"
                  >
                  </div>
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                  <h5 class="card-title">
                    <a
                      href="#"
                      class="text-dark font-weight-bold"
                      @click.prevent="goDetail(item.id)"
                    >{{ item.title }}</a>
                  </h5>
                  <p class="card-text">{{ item.content}}</p>
                  <div class="d-flex justify-content-end align-items-end">
                    <span
                      class="h5 font-weight-bold mb-0"
                      v-if="!item.price"
                    >售價{{ item.origin_price | currency }} 元</span>
                    <del
                      class="h6 mb-0 d-sm-none d-lg-flex"
                      v-if="item.price"
                    >原價 {{ item.origin_price | currency }} 元</del>
                    <div
                      v-if="item.price"
                      class="h5 ml-auto text-danger font-weight-bold mb-0"
                    >
                      <span>特價 {{ item.price | currency }} 元</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer border-top-0 d-flex">
                  <button
                    id="ho73-btn"
                    type="button"
                    class="btn btn-primary btn-md"
                    @click="goDetail(item.id)"
                  >
                    查看更多
                  </button>
                  <button
                    id="ho73-btn"
                    type="button"
                    class="btn btn-info btn-md ml-auto"
                    @click="addtoCart(item)"
                  >
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
  import ShoppingCart from "@/components/ShoppingCart.vue";
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "Shop",
    components: {
      ShoppingCart
    },
    data() {
      return {
        // products: [],
        filterProducts: [],
        filterSearch: "",
        searchText: ""
      };
    },
    methods: {
      addtoCart(item, qty = 1) {
        this.$store.dispatch("addtoCart", { item, qty });
      },
      goDetail(id) {
        this.$router.push(`/detail/${id}`);
      },
      filterTitle() {
        const vm = this;
        vm.filterProducts = vm.products.filter(product => {
          return product.title
            .toLowerCase()
            .includes(vm.filterSearch.toLowerCase());
        });
      },
      onChange() {
        const vm = this;
        vm.filterSearch = "";
      },
      ...mapActions("productsModules", ["getProducts"])
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
      },
      //左側選單以及行動版select選單filter
      filterData() {
        const vm = this;
        if (vm.searchText) {
          return vm.products.filter(product => {
            return product.category
              .toLowerCase()
              .includes(vm.searchText.toLowerCase());
          });
        } else {
          return vm.products;
        }
      },
      isLoading() {
        return this.$store.state.isLoading;
      },
      // products() {
      //   return this.$store.state.products;
      // },
      ...mapGetters("productsModules", ["products"])
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

  a {
    text-decoration: none;
  }
</style>