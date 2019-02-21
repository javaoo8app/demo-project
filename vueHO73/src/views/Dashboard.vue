<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from "@/components/NavbarFund.vue";

  export default {
    components: {
      Navbar
    }
  };
</script>


