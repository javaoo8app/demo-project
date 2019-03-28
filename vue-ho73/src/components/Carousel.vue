<template>
  <div>
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="1"
        ></li>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="2"
        ></li>
      </ol>
      <div class="carousel-inner">
        <div
          class="carousel-item  header-carousel-item active bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80')"
        >
          <div class="bg-gradient">
            <div class="carousel-caption d-none d-md-block logo-img">
              <img
                class="logo-img"
                src="../assets/images/ico/Ho73-bg.png"
                width="350px"
              >
            </div>
          </div>
        </div>
        <div
          class="carousel-item  header-carousel-item bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')"
        >
          <div class="bg-gradient">
            <div class="carousel-caption d-none d-md-block px-2">
              <h1 class="enFont mb-4">Sharing Love</h1>
              <p class="myFont my-3 d-none d-lg-block">愛的溫度，是我能為你做的事情</p>
              <p class="myFont">點亮盼望，傳遞愛</p>
            </div>
          </div>
        </div>
        <div
          class="carousel-item  header-carousel-item bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1460788150444-d9dc07fa9dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')"
        >
          <div class="bg-gradient">
            <div class="carousel-caption d-none d-md-block px-2">
              <h1 class="enFont mb-4">Be Together</h1>
              <p class="myFont my-3 d-none d-lg-block">別讓他們的無助，成為彼此的遺憾</p>
              <p class="myFont">你的微光，是我們的希望</p>
            </div>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import "../assets/_carousel.scss";
  export default {
    name: "Carousel",
    mounted() {
      $("#carouselExampleIndicators").carousel({
        interval: 5000
      });
    }
  };
</script>