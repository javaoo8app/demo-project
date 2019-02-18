<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      id="ho73-navbar"
    >
      <div class="container">
        <a
          class="navbar-brand"
          href="#"
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
                aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link
                  class="dropdown-item nav-link pl-2"
                  style="background-color:#343a40"
                  to=""
                >捐款</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  style="background-color:#343a40"
                  to=""
                >捐物</router-link>
                <router-link
                  class="dropdown-item nav-link pl-2"
                  style="background-color:#343a40"
                  to=""
                >志工服務</router-link>
              </div>
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
          <form class="form-inline my-2 my-l-0">
            <router-link
              to="/login"
              id="ho73-btn"
            >
              <button
                class="btn btn-primary mr-1"
                type="button"
              >
                <i class="mdi mdi-account h4"></i>
              </button>
            </router-link>
            <!-- <button
              class="btn btn-primary mr-1"
              type="button"
              @click.prevent="logout"
            >
              <i class="mdi mdi-account-minus h4"></i>
            </button> -->
            <router-link
              to=""
              id="ho73-btn"
            >
              <button
                class="btn btn-primary"
                type="button"
              >
                <i class="mdi mdi-cart h4"></i>
              </button>
            </router-link>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import "../assets/navbar.scss";

  export default {
    name: "Navbar",
    methods: {
      logout() {
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then(response => {
          if (response.data.success) {
            vm.$router.push("/login");
          }
        });
      }
    }
  };
</script>