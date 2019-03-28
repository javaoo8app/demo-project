<template>
  <div>
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item  header-carousel-item active bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80')"
        >
          <div class="bg-gradient">
            <div class="text-center px-2">
              <img
                src="../assets/images/ico/Ho73-bg.png"
                width="350px"
                style="margin-top:50%"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import "../assets/_carousel.scss";
  export default {
    name: "Carousel"
  };
</script>