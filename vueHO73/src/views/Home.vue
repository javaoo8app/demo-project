<template>
  <div>
    <Alert />
    <Navbar class="sticky-top" />
    <!-- <Carousel /> -->
    <router-view></router-view>
    <Footer class="d-none d-md-block" />
  </div>
</template>

<style>
</style>


<script>
  import Navbar from "@/components/Navbar";
  import Carousel from "@/components/Carousel";
  import Alert from "@/components/AlertMessage";
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