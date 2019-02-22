<template>
  <div>
    <Navbar class="sticky-top" />
    <Carousel />
  </div>
</template>

<style>
</style>


<script>
  import Navbar from "@/components/Navbar";
  import Carousel from "@/components/Carousel";

  export default {
    components: {
      Navbar,
      Carousel
    }
  };
</script>