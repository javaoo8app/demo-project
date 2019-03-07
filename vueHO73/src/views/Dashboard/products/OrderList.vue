<template>
  <div>
    <div class="container-fluid mt-4 main">
      <loading :active.sync="isLoading">
        <div class="img-center">
          <img
            class="w-50"
            style=""
            src="@/assets/images/ho73Loading.gif"
            alt=""
          >
        </div>
      </loading>
      <div class="row">
        <div class="col-lg-3 col-6 mb-4">
          <div class="card h-100">
            <div class="card-body d-flex align-items-center">
              <div class="far fa-money-bill-alt fa-3x text-secondary mr-2 d-none d-sm-block"></div>
              <div class="text-center w-100">
                <div class="h5">總營收</div>
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
                <div class="h5">客戶增加</div>
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
      <section class="my-3">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                新進訂單
              </div>
              <div class="card-body ">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th width="120">購買日期</th>
                        <th width="250">Email</th>
                        <th>購買款項</th>
                        <th width="120">應付金額</th>
                        <th width="120">是否付款</th>
                        <th width="190">編輯</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in orders"
                        :key="item.id"
                      >
                        <td>{{ item.create_at }}</td>
                        <td>{{ item.user.email }}</td>
                        <td>
                          <ul>
                            <li
                              v-for="product in item.products"
                              :key="product.id"
                              {{product.product.title}}
                              數量
                              ：
                              {{product.qty}}
                              {{product.product.unit}}
                            ></li>
                          </ul>
                        </td>
                        <td class="text-right"> {{ item.total | currency}} </td>
                        <td>
                          <span
                            v-if="item.is_paid == 1"
                            class="text-success"
                          >已付款</span>
                          <span v-else>尚未付款</span>
                        </td>
                        <td>
                          <div
                            class="btn-group btn-group-sm"
                            role="group"
                            aria-label="Button group with nested dropdown"
                          >
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-backdrop="static"
                            >留言</button>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                            >出貨</button>
                            <div
                              class="btn-group btn-group-sm"
                              role="group"
                            >
                              <button
                                id="btnGroupDrop1"
                                type="button"
                                class="btn btn-outline-secondary dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                其他
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  href="#"
                                >加入 好人客</a>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                >加入 黑名單</a>
                                <div class="dropdown-divider"></div>
                                <div id="ho73-del-btn">
                                  <a
                                    class="dropdown-item text-danger"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#removeModal"
                                    data-title=""
                                  >刪除</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2019/3/7</td>
                        <td>ggyy@gmail.com</td>
                        <td>
                          <ul class="pl-0">
                            <li>愛心糖糖:9包</li>
                            <li>愛心餅乾:9包</li>
                          </ul>
                        </td>
                        <td class="text-right"> {{ 100 | currency}} </td>
                        <td>
                          <span>已付款</span>
                        </td>
                        <td>
                          <div
                            class="btn-group btn-group-sm"
                            role="group"
                            aria-label="Button group with nested dropdown"
                          >
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-backdrop="static"
                            >留言</button>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                            >出貨</button>
                            <div
                              class="btn-group btn-group-sm"
                              role="group"
                            >
                              <button
                                id="btnGroupDrop1"
                                type="button"
                                class="btn btn-outline-secondary dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                其他
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  href="#"
                                >加入 好人客</a>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                >加入 黑名單</a>
                                <div class="dropdown-divider"></div>
                                <div id="ho73-del-btn">
                                  <a
                                    class="dropdown-item text-danger"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#removeModal"
                                    data-title=""
                                  >刪除</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- pagination -->
      <Pagination
        @changePage="getOrderList"
        :propPage="pagination"
      ></Pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from "@/components/Pagination";
  export default {
    name: "OrderList",
    components: {
      Pagination
    },
    data() {
      return {
        orders: [],
        isLoading: false,
        pagination: {}
      };
    },
    methods: {
      getOrderList(page = 1) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/orders?page=${page}`;
        this.isLoading = true;
        this.$http.get(url).then(response => {
          // console.log(response);
          vm.orders = response.data.orders;
          this.isLoading = false;
        });
      }
    },
    created() {
      this.getOrderList();
    }
  };
</script>

<style lang="scss" scoped>
  // #ho73-btn :hover,
  // .close {
  //   outline: none !important;
  //   box-shadow: none !important;
  // }
  #ho73-del-btn a:hover {
    color: #fff !important;
    background: #f38181;
  }
  .img-center {
    text-align: center;
    zoom: 0.8;
  }
</style>