<template>
  <div>
    <Navbar class="sticky-top" />
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


