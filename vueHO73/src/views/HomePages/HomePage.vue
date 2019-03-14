<template>
  <div>
    <Carousel class="d-none d-md-block" />
    <CarouselMB class="d-md-none" />
    <!-- 關於本站 -->
    <section
      class="container mt-5"
      id="aboutUs"
    >
      <h1 class="text-secondary font-weight-bold text-center mb-3">關於本站</h1>
      <h5 class="text-secondary text-center mb-5">Half of 73°C是一個公益平台，我們希望透過網站幫助台灣的弱勢族群，
        也致力於讓使用者有更方便且值得信賴的互助管道。</h5>
      <div class="row mb-4">
        <div class="col-md-6 mb-4">
          <div class="text-center">
            <img
              src="https://images.unsplash.com/photo-1476304884326-cd2c88572c5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              class="img-fluid rounded"
              alt="img"
            >
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="accordion"
            id="accordionExample"
          >
            <div class="card">
              <div
                class="card-header"
                id="headingOne"
              >
                <h2 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <i class="fas fa-lightbulb fa-2x  text-info ml-2"></i>
                    <span class="h5 ml-4 text-secondary">發想起源</span>
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  "Half of 73°C"源自我們認為人與人之間的相處，需要保持一種"溫度"。而人體的平均體溫是36.5°C，有了你我，愛才完整。
                  有鑑於2018年2月6號的花蓮震災發生後，我們想貢獻一份微薄的心力卻苦於沒有簡單迅速地管道。
                  再者亦發生花蓮縣長傅崐萁濫用善款補助業者的情形，這讓我們意識到建立一個方便使用、而且金流明細公開的平台
                  是值得我們去努力的。
                </div>
              </div>
            </div>
            <div class="card">
              <div
                class="card-header"
                id="headingTwo"
              >
                <h2 class="mb-0">
                  <button
                    class="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <i class="fas fa-hands-helping fa-2x text-info"></i>
                    <span class="h5 ml-3 text-secondary">我們的理念</span>
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  我們希望能夠實現當每一個人，願意為了他人付出時能有一個簡易使用的管道，而且不必擔心自己所貢獻的
                  一份心意是否有確實傳達。<br>　　大文豪莎士比亞曾寫到過：慈悲不是出於勉强，它如同甘露一樣從天上降下塵世；不但給幸福於受施之人，
                  也同樣給幸福於施與的人。我們想要回應每一位願意付出之人的赤誠心意，
                  將過程與事後追蹤簡單化，讓這樣的心意不會在前置繁雜事務中消磨殆盡。
                </div>
              </div>
            </div>
            <div class="card">
              <div
                class="card-header"
                id="headingThree"
              >
                <h2 class="mb-0">
                  <button
                    class="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <i class="fas fa-flag-checkered fa-2x text-info"></i>
                    <span class="h5 ml-4 text-secondary">未來展望</span>
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  我們一直致力於提供所有使用者良好的捐募平台，未來希望能讓更多地基金會也能一同參與。
                  我們也會不斷提升使用的簡便度和針對所有有需求、不論是需要施予他人或受施於他人的使用者，
                  更貼近生活所需地去協助大家。<br>
                  　　往後我們也希望擴展至更多使用平台，不論是Android或是iOS系統。讓大家的愛心能夠在更多地方延伸。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Carousel from "@/components/Carousel";
  import CarouselMB from "@/components/Carousel_mb";

  export default {
    name: "HomePage",
    components: {
      Carousel,
      CarouselMB
    }
  };
</script>

<style lang="scss" scoped>
  .btn-link {
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
</style>