<template>
  <div>
    <Alert />
    <Navbar class="sticky-top" />
    <!-- <Carousel /> -->
    <router-view></router-view>
  </div>
</template>

<style>
</style>


<script>
  import Navbar from "@/components/Navbar";
  import Carousel from "@/components/Carousel";
  import Alert from "@/components/AlertMessage.vue";

  export default {
    components: {
      Navbar,
      Carousel,
      Alert
    }
  };
</script>