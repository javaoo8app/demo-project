<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky pl-3">
        <h6 class="sidebar-heading d-flex justify-content-between
        align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a
            class="d-flex align-items-center text-muted"
            href="#"
          >
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            class="nav-item"
            @click.prevent="link = 'product'"
          >
            <router-link
              to="/admin/products"
              class="nav-link"
              :class="{'active':link=='product'}"
            >
              <i class="fas fa-box-open"></i> 產品列表
            </router-link>
          </li>
          <li
            class="nav-item"
            @click.prevent="link = 'order'"
          >
            <router-link
              to="/admin/products/orderList"
              class="nav-link"
              :class="{'active':link=='order'}"
            >
              <i class="far fa-list-alt"></i> 訂單列表
            </router-link>
          </li>
          <li
            class="nav-item"
            @click.prevent="link = 'coupon'"
          >
            <router-link
              to="/admin/products/coupons"
              class="nav-link"
              :class="{'active':link=='coupon'}"
            >
              <i class="fas fa-ticket-alt"></i> 優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {
        link: "product"
      };
    }
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
    &:hover {
      color: #47ccb3;
    }
  }

  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }

  .sidebar .nav-link.active {
    color: #47ccb3;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: 0.75rem;
    text-transform: uppercase;
  }
</style>