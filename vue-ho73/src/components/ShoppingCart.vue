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
  import { mapGetters, mapActions } from "vuex";
  export default {
    data() {
      return {
        msg: ""
        // cart: [],
        // cartNum: 0
      };
    },
    methods: {
      // getCart() {
      //   this.$store.dispatch("getCart");
      // },
      goCheckout() {
        const vm = this;
        this.$router.push("/customer_order");
      },
      ...mapActions(["getCart"])
    },
    computed: {
      // cart() {
      //   return this.$store.state.cart;
      // },
      // cartNum() {
      //   return this.$store.state.cartNum;
      // }
      ...mapGetters(["cart", "cartNum"])
    },
    created() {
      this.getCart();
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