<template>
  <div>
    <div class="container-fluid mt-4 main">
      <div class="row">
        <div class="col-lg-3 col-6 mb-4">
          <div class="card h-100">
            <div class="card-body d-flex align-items-center">
              <div class="far fa-money-bill-alt fa-3x text-secondary mr-2 d-none d-sm-block"></div>
              <div class="text-center w-100">
                <div class="h5">今日營收</div>
                <div class="h3">200,000</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="fas fa-users fa-3x text-secondary mr-2 d-none d-sm-block"></div>
              <div class="text-center w-100">
                <div class="h5">會員增加</div>
                <div class="display-4">999</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="far fa-id-card fa-3x text-secondary mr-2 d-none d-sm-block"></div>
              <div class="text-center w-100">
                <div class="h5">訂單數</div>
                <div class="display-4">360</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="fas fa-archive fa-3x text-secondary mr-2 d-none d-sm-block"></div>
              <div class="text-center w-100">
                <div class="h5">待出貨數</div>
                <div class="display-4">160</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="mt-3">
        <div class="row">
          <div class="col-lg-4">
            <div class="card pt-5 h-100">
              <div class="card-body text-center">
                <span>本日訂單數量</span>
                <div class="display-2">88</div>
                <div class="mt-5">
                  <div
                    class="progress"
                    style="height: 15px;"
                  >
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 30%"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >未出貨</div>
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      style="width: 70%"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >已出貨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                新進訂單
              </div>
              <div class="card-body ">
                <div class="d-flex">
                  <a
                    href="#"
                    class="btn btn-outline-secondary mb-3 ml-auto"
                  >訂單管理</a>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">來源</th>
                        <th scope="col">姓名</th>
                        <th scope="col">貨品</th>
                        <th
                          scope="col"
                          width="100"
                        >價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">日本</th>
                        <td>さん</td>
                        <td>化妝品</td>
                        <td class="text-right">6,600</td>
                      </tr>
                      <tr>
                        <th scope="row">澳洲</th>
                        <td>Jacob</td>
                        <td>牛奶</td>
                        <td class="text-right">1,200</td>
                      </tr>
                      <tr>
                        <th scope="row">英國</th>
                        <td>Larry</td>
                        <td>手錶</td>
                        <td class="text-right">9,300</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colspan="3"
                          class="text-right"
                        >總營收</td>
                        <td class="text-right">17,310</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    components: {}
  };
</script>
