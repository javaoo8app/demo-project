<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main
          role="main"
          class="col-md-9 ml-sm-auto col-lg-10 px-4"
        >
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>

</template>

<script>
  import "@/assets/dashboard/products/_products.scss";
  import Sidebar from "@/views/Dashboard/products/Sidebar.vue";

  export default {
    components: {
      Sidebar
    }
  };
</script>
