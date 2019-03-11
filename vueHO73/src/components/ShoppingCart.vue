<template>
  <div>
    <div
      v-show="!cartNum == 0"
      class="fixPage"
      @click="goCheckout"
    >
      <div
        id="cart"
        class="d-flex justify-content-center"
      >
        <i
          class="fas fa-shopping-cart fa-3x text-warning m-auto"
          aria-hidden="true"
        ></i>
        <span class="badge badge-pill badge-danger ">{{ cartNum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: "",
        cart: [],
        cartNum: 0
      };
    },
    methods: {
      getCart() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        this.$http.get(api).then(response => {
          // console.log(response);
          vm.cart = response.data.data;
          vm.cartNum = vm.cart.carts.length;
        });
      },
      goCheckout() {
        const vm = this;
        if (vm.cartNum == 0) {
          alert("購物車是空的喔 請選購商品吧");
        } else {
          this.$router.push("/customer_order");
        }
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

<style lang="scss" scoped>
  $yellow: #fce38a;
  $pink: #f38181;

  .transform-num {
    transform: translate(50px, -80px);
    font-size: 18px;
  }

  .fixPage {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 100;
    cursor: pointer;

    #cart {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: $pink;
      :hover,
      :focus {
        outline: none !important;
        box-shadow: none !important;
      }
      i {
        color: $yellow;
        &:hover {
          color: $yellow !important;
        }
      }
      position: relative;

      .badge {
        position: absolute;
        top: 1rem;
        left: 3.5rem;
      }
    }
  }
</style>