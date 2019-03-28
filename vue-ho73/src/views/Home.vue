<template>
  <div>
    <Alert />
    <Navbar class="sticky-top" />
    <router-view></router-view>
    <Footer class="d-none d-md-block" />
  </div>
</template>

<style>
</style>


<script>
  import Navbar from "@/components/Navbar";
  import Carousel from "@/components/Carousel";
  import Alert from "@/components/Alert";
  import Footer from "@/components/Footer";

  export default {
    components: {
      Navbar,
      Carousel,
      Alert,
      Footer
    }
  };
</script>