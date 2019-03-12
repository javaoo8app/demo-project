<template>
  <div>
    <Carousel />
    <AboutUs />
  </div>
</template>

<script>
  import Carousel from "@/components/Carousel";
  import AboutUs from "@/views/HomePages/aboutUs/AboutUs";
  export default {
    name: "HomePage",
    components: {
      Carousel,
      AboutUs
    }
  };
</script>