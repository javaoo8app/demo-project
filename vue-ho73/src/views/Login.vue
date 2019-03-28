<template>
  <div>
    <Navbar />
    <form
      class="form-signin"
      @submit.prevent="signin"
      @keyup.enter="signin"
    >
      <h1 class="h3 mb-3 font-weight-normal">歡迎登入</h1>
      <label
        for="inputEmail"
        class="sr-only"
      >Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="user.username"
        required
        autofocus
      >
      <label
        for="inputPassword"
        class="sr-only"
      >Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      >
      <!-- <div class="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            value="remember-me"
          > 記住我
        </label>
      </div> -->
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
    </form>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  export default {
    name: "Login",
    components: {
      Navbar
    },
    data() {
      return {
        user: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      signin() {
        const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
        const vm = this;
        this.$http.post(api, vm.user).then(response => {
          console.log(response.data);
          if (response.data.success) {
            vm.$router.push("/admin/products");
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>

