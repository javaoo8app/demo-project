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
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                消息活動
              </a>
              <div
                class="dropdown-menu bg-dark"
                id="ho73-dropdown"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >最新消息管理</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >志工活動管理</router-link>
              </div>
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
                商品捐募
              </a>
              <div
                class="dropdown-menu bg-dark"
                id="ho73-dropdown"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >募款管理</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to=""
                >物資管理</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  to="/admin/products"
                >商品管理</router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to=""
              >
                愛的回饋
              </router-link>
            </li> -->
          </ul>
          <form class="form-inline my-2 my-l-0">
            <!-- <router-link
              to=""
              id="ho73-nav-btn"
            >
              <button
                class="btn btn-primary mr-1"
                type="button"
              >
                <i class="fas fa-user-edit fa-2x"></i>
              </button>
            </router-link> -->
            <router-link
              to=""
              id="ho73-nav-btn"
            >
              <button
                class="btn btn-primary mr-1"
                type="button"
                @click.prevent="logout"
              >
                <i class="fas fa-sign-out-alt fa-2x"></i>
              </button>
            </router-link>
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
    methods: {
      logout() {
        const api = `${process.env.VUE_APP_APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then(response => {
          if (response.data.success) {
            vm.$router.push("/");
          }
        });
      }
    }
  };
</script>

<style>
  .navbar {
    z-index: 999;
  }
</style>