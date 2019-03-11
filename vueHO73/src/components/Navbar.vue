<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      id="ho73-navbar"
    >
      <div class="container">
        <a
          class="navbar-brand"
          href="/"
        >
          <img
            src="../assets/images/ico/Ho73-logo.png"
            height="40"
            alt=""
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link
                class="nav-link"
                to=""
              >最新消息</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to=""
              >
                基金會
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                愛心捐募
              </a>
              <div
                class="dropdown-menu bg-dark"
                id="ho73-dropdown"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >捐款</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >捐物</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >志工服務</router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/shop"
              >
                義賣商品
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to=""
              >
                關於本站
              </router-link>
            </li>
          </ul>
          <form
            class="form-inline my-2 my-l-0"
            id="navbar-right"
          >
            <router-link
              to="/admin/products/productList"
              id="ho73-nav-btn"
              class="nav-link"
            >
              <button
                class="btn btn-primary mr-1"
                type="button"
              >
                <i class="fas fa-user-alt fa-2x"></i>
              </button>
            </router-link>
            <!-- <button
              id="btn-cart"
              class="btn btn-primary mr-1"
              type="button"
            >
              <i class="fas fa-shopping-cart fa-2x"></i>
              <span
                class="badge badge-pill badge-danger"
                v-if="!cartNum == 0"
              >{{ cartNum }}</span>
            </button> -->
            <div
              class="dropdown"
              id="dropdown"
            >
              <button
                id="btn-cart"
                class="btn btn-primary"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  class="fas fa-shopping-cart fa-2x text-white"
                  aria-hidden="true"
                ></i>
                <span class="badge badge-pill badge-danger">{{ cartNum }}</span>
              </button>
              <div
                v-show="!cartNum == 0"
                class="dropdown-menu dropdown-menu-left dropdown-menu-lg-right p-3"
                aria-labelledby="CartDropdown"
                style="min-width: 500px;overflow:scroll;height:400px;"
                data-offset="400"
              >
                <div class="px-4 py-3">
                  <h6>已選擇商品</h6>
                  <table class="table">
                    <tbody>
                      <tr
                        v-for="item in cart.carts"
                        :key="item.id"
                      >
                        <td class="align-middle">
                          <button
                            type="button"
                            class="btn btn-outline-danger btn-sm"
                            @click.prevent="removeCartItem(item)"
                          >
                            <i class="fas fa-trash fa-lg"></i>
                          </button>
                        </td>
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td
                          class="align-middle"
                          width="70"
                        >{{ item.qty }}{{item.product.unit}}</td>
                        <td
                          v-if="!item.product.price"
                          class="align-middle text-right"
                          width="70"
                        >{{ item.qty * item.product.origin_price | currency}}</td>
                        <td
                          v-else
                          class="align-middle text-right"
                          width="70"
                        >{{ item.qty * item.product.price | currency}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <router-link to="/customer_order">
                    <button class="btn btn-warning btn-block">
                      <i class="fas fa-shopping-bag"> 結帳去</i>
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import "../assets/_navbar.scss";

  export default {
    name: "Navbar",
    data() {
      return {
        cart: [],
        cartNum: 0
      };
    },
    methods: {
      logout() {
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then(response => {
          if (response.data.success) {
            vm.$router.push("/login");
          }
        });
      },
      getCart() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        this.$http.get(api).then(response => {
          // console.log(response);
          vm.cart = response.data.data;
          vm.cartNum = vm.cart.carts.length;
        });
      },
      removeCartItem(item) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${
          item.id
        }`;
        this.$http.delete(api).then(response => {
          // console.log(response);
          this.getCart();
          let msg = response.data.message + ":" + item.product.title;
          vm.$bus.$emit("updateCart");
          vm.$bus.$emit("message:push", msg, "info");
        });
      }
    },
    created() {
      this.getCart();
      const vm = this;
      vm.$bus.$on("updateCart", () => {
        vm.getCart();
      });
    }
  };
</script>
