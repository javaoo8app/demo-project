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
      <h1 class="text-secondary font-weight-bold text-center mb-5">Half of 73°C 結帳</h1>
      <div class="form-row">
        <div class="col-sm col-12">
          <div
            class="alert alert-info text-center alert-rounded"
            role="alert"
          >
            1.輸入訂單資料
          </div>
        </div>
        <div class="col-sm col-12">
          <div
            class="alert alert-secondary text-center alert-rounded"
            role="alert"
          >
            2.金流付款
          </div>
        </div>
        <div class="col-sm col-12">
          <div
            class="alert alert-secondary text-center alert-rounded"
            role="alert"
          >
            3.完成
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6 mb-3">
          <div
            class="accordion"
            id="accordionExample"
          >
            <div class="card rounded">
              <div
                class="card-header mb-0"
                id="headingOne"
              >
                <div class="container">
                  <div class="row justify-content-between">
                    <button
                      class="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      顯示購物車細節
                      <i class="fas fa-chevron-down"></i>
                    </button>
                    <span class="h3">{{ cart.final_total | currency }}</span>
                  </div>
                </div>
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th
                        scope="col"
                        class="d-none d-lg-block"
                      >商品名稱</th>
                      <th
                        scope="col"
                        class="d-lg-none"
                      >品名</th>
                      <th scope="col">數量</th>
                      <th
                        scope="col"
                        width="100"
                      >小計</th>
                    </tr>
                    <tr
                      v-for="item in cart.carts"
                      :key="item.id"
                    >
                      <td
                        class="align-middle text-right"
                        align="center"
                        valign="center"
                      >
                        <!-- <div class="ml-4"> -->
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="removeCartItem(item)"
                        >
                          <i class="fas fa-trash fa-lg"></i>
                        </button>
                        <!-- </div> -->
                      </td>

                      <td
                        width="100"
                        align="center"
                        valign="center"
                      >
                        <div class="tt">
                          <img
                            class="imgItem-center"
                            :style="`background-image: url(${item.product.imageUrl});`"
                          >
                        </div>
                      </td>
                      <td class="align-middle">{{ item.product.title }}
                        <div
                          v-if="item.coupon"
                          class="text-info d-none d-lg-block"
                        >
                          已套用優惠券
                        </div>
                      </td>
                      <td
                        class="align-middle"
                        width="70"
                      >{{ item.qty }}{{item.product.unit}}</td>
                      <td
                        v-if="!item.product.price"
                        class="align-middle text-right pr-3 pr-md-2 pr-lg-3"
                        width="70"
                      >{{ item.qty * item.product.origin_price | currency }}</td>
                      <td
                        v-else
                        class="align-middle text-right pr-3 pr-md-2 pr-lg-3"
                        width="70"
                      >{{ item.qty * item.product.price | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colspan="3"
                        class=""
                      >
                        <div class="input-group mb-0 mt-2 input-group-md">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="請輸入優惠碼"
                            v-model="coupon_code"
                            @keyup.enter="addCouponCode"
                          >
                          <div class="input-group-append">
                            <button
                              class="btn btn-info"
                              type="button"
                              @click="addCouponCode"
                            >
                              <div class="d-none d-lg-block">套用優惠碼</div>
                              <div class="d-lg-none">套用</div>
                            </button>
                          </div>
                        </div>
                        <p class="text-danger">{{ findCoupon }}</p>
                      </td>
                      <td class="align-middle text-right p-0">總計：</td>
                      <td
                        class="align-middle text-right pr-3 pr-md-2 pr-lg-3"
                        width="10"
                      >${{ cart.total }}</td>
                    </tr>
                    <tr v-if="cart.total !== cart.final_total">
                      <td
                        colspan="4"
                        class="align-middle text-right text-info"
                      >折扣價：</td>
                      <td
                        class="align-middle text-right text-info pr-3 pr-md-2 pr-lg-3"
                        width="10"
                      >{{ cart.final_total | currency }}</td>
                      <!-- 此總數只適用於有優惠的價格，需再做計算，最好由後端更改，金錢較為敏感，預防別人篡改 -->
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <h5 class="text-center mb-3">訂購人資訊</h5>
          <form
            class="text-left"
            @submit.prevent="createOrder"
          >
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="userName">收件人姓名</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="userName"
                  v-model="form.user.name"
                  v-validate="'required'"
                  placeholder="輸入姓名"
                  :class="{'is-invalid': errors.has('name')}"
                >
                <span
                  v-if="errors.has('name')"
                  class="text-danger"
                >姓名必須輸入</span>
              </div>
              <div class="form-group col-md-6">
                <label for="userEmail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="userEmail"
                  v-model="form.user.email"
                  v-validate="'required|email'"
                  placeholder="請輸入 Email"
                  :class="{'is-invalid': errors.has('email')}"
                >
                <span
                  v-if="errors.has('email')"
                  class="text-danger"
                >{{ errors.first('email')}}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="userTel">收件人電話</label>
              <input
                type="regex"
                class="form-control"
                id="userTel"
                name="regex"
                v-model="form.user.tel"
                v-validate="{ required: true, regex:/^\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4}$/ }"
                placeholder="請輸入電話"
                :class="{'is-invalid': errors.has('regex')}"
              >
              <span
                v-if="errors.has('regex')"
                class="text-danger"
              >請輸入10碼數字之電話號碼</span>
            </div>
            <div class="form-group">
              <label for="userAddress">收件人地址</label>
              <input
                type="address"
                class="form-control"
                name="address"
                id="userAddress"
                v-model="form.user.address"
                v-validate="'required'"
                placeholder="請輸入地址"
                :class="{'is-invalid': errors.has('address')}"
              >
              <span
                v-if="errors.has('address')"
                class="text-danger"
              >地址必須輸入</span>
            </div>
            <div class="form-group">
              <label for="userMessage">留言</label>
              <textarea
                name="message"
                id="userMessage"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <router-link to="/shop">
                <button class="btn btn-secondary mr-2">
                  繼續選購
                </button>
              </router-link>
              <button class="btn btn-info mr-2">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "CustomerOrder",
    data() {
      return {
        // cart: [],
        isLoading: false,
        coupon_code: "",
        findCoupon: "",
        form: {
          user: {
            name: "",
            email: "",
            tel: "",
            address: ""
          },
          message: ""
        }
      };
    },
    methods: {
      removeCartItem(item) {
        this.$store.dispatch("removeCartItem", item);
      },
      addCouponCode() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/coupon`;
        const coupon = {
          code: vm.coupon_code
        };
        this.$http.post(api, { data: coupon }).then(response => {
          console.log(response);
          this.getCart();
          if (!response.data.success) {
            vm.findCoupon = response.data.message;
            vm.coupon_code = "";
          } else {
            vm.findCoupon = "";
          }
        });
      },
      createOrder() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/order`;
        const order = vm.form;
        vm.isLoading = true;
        this.$validator.validate().then(result => {
          if (result) {
            this.$http.post(api, { data: order }).then(response => {
              console.log("訂單已建立", response);
              if (response.data.success) {
                vm.$router.push(`/customer_checkout/${response.data.orderId}`);
              }
              vm.isLoading = false;
            });
          } else {
            vm.isLoading = false;
            console.log("欄位不完整");
          }
        });
      },
      ...mapActions(["getCart"])
    },
    computed: {
      ...mapGetters(["cart", "cartNum"])
    },
    created() {
      this.getCart();
    }
  };
</script>

<style lang="scss" scoped>
  .img-center {
    text-align: center;
    zoom: 0.8;
  }
  .alert-rounded {
    border-radius: 50px;
  }
  #collapseOne {
    border-bottom: 1px solid #dee2e6;
  }
  .imgItem-center {
    background-size: cover;
    background-position: center center;
    width: 100px;
    height: 100px;
  }
  .btn-link {
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
</style>