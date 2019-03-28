<template>
  <div>
    <div class="bg">
      <footer class="container">
        <div class="form-row py-2">
          <div class="col-md-3 mt-3">
            <a
              class=""
              href="/"
            >
              <img
                class="myImg"
                src="../assets/images/ico/Ho73-pureLogo.png"
                alt=""
              />
            </a>
          </div>
          <div class="col-md-9 text-secondary mt-md-3 mt-lg-5">
            <p>
              　　我們希望藉由Half of 73°C 平台創造更加完備且快速地使用方式，提供所有願意付出的人，不論是以基金會的型式或是個人的名義。我們需要您的陪伴，一起創造更好的未來。
            </p>
          </div>
        </div>
        <div class="row pb-3">
          <div class="col-md-5 mt-1 mb-2">
            <span class="h5 text-secondary">Follow Us : </span>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              title="facebook"
              class="text-info ml-2"
            ><i class="fab fa-facebook-square fa-2x"></i></a>
            <a
              href="https://twitter.com/"
              target="_blank"
              title="twitter"
              class="text-info ml-2"
            ><i class="fab fa-twitter  fa-2x"></i></a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              title="instagram"
              class="text-info ml-2"
            ><i class="fab fa-instagram  fa-2x"></i></a>
            <a
              href="https://www.youtube.com/?gl=TW&hl=zh-TW"
              target="_blank"
              title="youtube"
              class="text-info ml-2"
            ><i class="fab fa-youtube  fa-2x"></i></a>
          </div>
          <div class="col-md-6 ml-auto">
            <div class="input-group mb-0 input-group-md">
              <input
                type="text"
                class="form-control"
                placeholder="輸入信箱獲取最新消息!"
              >
              <div class="input-group-append">
                <button
                  class="btn btn-info text-"
                  type="button"
                >
                  訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-2 pb-4">
          <div class="text-center">Copyright &copy; 2019 <a
              href=""
              title="Half of 73°C"
            >halfof73.com</a>. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/helpers/_grid.scss";
  .bg {
    background-color: #f8f8f8;
  }
  .myImg {
    max-width: 250px;
    @include pad() {
      max-width: 150px;
    }
  }
  a {
    text-decoration: none;
  }
</style>