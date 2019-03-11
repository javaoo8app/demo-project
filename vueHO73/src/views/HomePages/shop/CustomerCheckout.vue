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
            class="alert alert-secondary text-center alert-rounded"
            role="alert"
          >
            1.輸入訂單資料
          </div>
        </div>
        <div class="col-sm col-12">
          <div
            v-if="!order.is_paid"
            class="alert alert-info text-center alert-rounded"
            role="alert"
          >
            2.金流付款
          </div>
          <div
            v-else
            class="alert alert-secondary text-center alert-rounded"
            role="alert"
          >
            2.金流付款
          </div>
        </div>
        <div class="col-sm col-12">
          <div
            v-if="!order.is_paid"
            class="alert alert-secondary text-center alert-rounded"
            role="alert"
          >
            3.完成
          </div>
          <div
            v-else
            class="alert alert-info text-center alert-rounded"
            role="alert"
          >
            3.完成
          </div>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <form
          class="col-md-6"
          @submit.prevent="payOrder"
        >
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr
                v-for="item in order.products"
                :key="item.id"
              >
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colspan="2"
                  class="text-right"
                >總計</td>
                <td class="text-right">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span
                    v-else
                    class="text-success"
                  >付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="text-right"
            v-if="order.is_paid === false"
          >
            <button class="btn btn-info">確認付款去</button>
          </div>
          <div
            class="text-right"
            v-if="order.is_paid === true"
          >
            <router-link to="/">
              <button class="btn btn-info mr-2">
                返回首頁
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "CustomerCheckout",
    data() {
      return {
        isLoading: false,
        orderId: "",
        order: {
          user: {}
        }
      };
    },
    methods: {
      getOrder() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${
          vm.orderId
        }`;
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          // console.log(response);
          vm.order = response.data.order;
          vm.isLoading = false;
        });
      },
      payOrder() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${
          vm.orderId
        }`;
        vm.isLoading = true;
        this.$http.post(api).then(response => {
          if (response.data.success) {
            vm.getOrder();
            vm.$bus.$emit("updateCart");
          }
          console.log(response);
          vm.isLoading = false;
        });
      }
    },
    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder();
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
</style>
