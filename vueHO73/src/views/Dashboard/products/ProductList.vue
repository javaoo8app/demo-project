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
        <div class="col-8 col-md-4">
          <div class="input-group input-group-sm mb-2 mb-sm-0">
            <input
              type="text"
              class="form-control"
              placeholder="搜尋商品"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              data-toggle="tooltip"
              data-placement="top"
              title="按下 Enter 快速搜尋"
            >
            <div class="input-group-append ">
              <button
                class="btn btn-secondary"
                type="button"
                id="button-addon2"
              ><i class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
        <div class="col-4 col-md-8 text-right ml-auto">
          <button
            id="ho73-btn"
            class="btn btn-info"
            @click="openModal(true)"
          >
            建立新產品
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="100">原價</th>
              <th width="100">售價</th>
              <th width="100">是否啟用</th>
              <th width="190">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item) in products"
              :key="item.id"
            >
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">{{ item.origin_price | currency }}</td>
              <td class="text-right">{{ item.price | currency }}</td>
              <td>
                <span
                  v-if="item.is_enabled"
                  class="text-success"
                >啟用</span>
                <span v-else>未啟用</span>
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
                    @click="openModal(false, item)"
                  >編輯</button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                  >查看</button>
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
                      >加入 XXX</a>
                      <a
                        class="dropdown-item"
                        href="#"
                      >加入 YYY</a>
                      <div class="dropdown-divider"></div>
                      <div id="ho73-del-btn">
                        <a
                          class="dropdown-item text-danger"
                          href="#"
                          data-toggle="modal"
                          data-target="#removeModal"
                          data-title=""
                          @click="openDelModal(item)"
                        >刪除</a>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- pagination -->
        <Pagination
          @changePage="getProducts"
          :propPage="pagination"
        ></Pagination>
      </div>
    </div>

    <!-- productModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div
            class="modal-header text-white"
            :class="isNew ? 'bg-info' : 'bg-dark'"
          >
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span v-if="isNew">新增產品</span>
              <span v-else>修改產品</span>
            </h5>
            <button
              type="button"
              class="close text-light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  >
                </div>
                <img
                  class="img-fluid"
                  alt=""
                  :src="tempProduct.imageUrl"
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    >
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-info"
              id="ho73-btn"
              @click="updateProduct"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delProductModal -->
    <div
      class="modal fade mt-5"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close text-light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-primary">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-primary"
              style="color:#fff"
              @click="delProduct"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import Pagination from "@/components/Pagination";

  export default {
    components: {
      Pagination
    },
    data() {
      return {
        products: [],
        tempProduct: {},
        isNew: false,
        isLoading: false,
        status: {
          fileUploading: false
        },
        pagination: {}
      };
    },
    methods: {
      getProducts(page = 1) {
        const api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/products/?page=${page}`;
        const vm = this;
        //增加loading
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          // console.log(response.data);
          vm.isLoading = false;
          if (response.data.success) {
            vm.products = response.data.products;
            vm.pagination = response.data.pagination;
          }
        });
      },
      updateProduct() {
        let api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/product`;
        let httpMethod = "post";
        const vm = this;
        // 修改產品
        if (!vm.isNew) {
          api = `${process.env.APIPATH}/api/${
            process.env.CUSTOMPATH
          }/admin/product/${vm.tempProduct.id}`;
          httpMethod = "put";
        }
        // 新增產品
        this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
          // console.log(response.data);
          if (response.data.success) {
            $("#productModal").modal("hide");
            vm.getProducts();
          } else {
            $("#productModal").modal("hide");
            console.log("新增錯誤");
          }
        });
      },
      delProduct() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/product/${vm.tempProduct.id}`;
        this.$http.delete(api, { data: vm.tempProduct }).then(response => {
          // console.log(response.data);
          if (response.data.success) {
            $("#delProductModal").modal("hide");
            vm.getProducts();
          } else {
            $("#delProductModal").modal("hide");
            vm.getProducts();
            console.log("刪除失敗");
          }
        });
      },
      openModal(isNew, item) {
        //關閉Modal外部及Esc事件
        $("#productModal").modal({ backdrop: "static", keyboard: false });
        if (isNew) {
          this.tempProduct = {};
          this.isNew = true;
        } else {
          // 避免this.tempProduct與item有參考，所以用此
          this.tempProduct = Object.assign({}, item);
          this.isNew = false;
        }
        $("#productModal").modal("show");
      },
      openDelModal(item) {
        //需要將DelModal的點擊外部關閉再將下面註解開啟
        // $("#delProductModal").modal({ backdrop: "static", keyboard: false });
        this.tempProduct = Object.assign({}, item);
        $("#delProductModal").modal("show");
      },
      uploadFile() {
        // console.log(this);
        const uploadedFile = this.$refs.files.files[0];
        const vm = this;
        const formData = new FormData();
        formData.append("file-to-upload", uploadedFile);
        const url = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/upload`;
        //開啟Loading圖示
        vm.status.fileUploading = true;
        this.$http
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            // console.log(response.data);
            //關閉Loading圖示
            vm.status.fileUploading = false;
            if (response.data.success) {
              // vm.tempProduct.imageUrl = response.data.imageUrl;
              // console.log(vm.tempProduct);
              //因上面方式無法綁定到畫面，改為強制寫入，顯示於畫面
              vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
              //回覆錯誤訊息
            } else {
              if (typeof response.data.message == "string") {
                this.$bus.$emit("message:push", response.data.message, "danger");
              } else {
                this.$bus.$emit(
                  "message:push",
                  response.data.message.message,
                  "danger"
                );
              }
            }
          });
      }
    },
    created() {
      this.getProducts();
      // this.$bus.$emit("message:push", "這是一段訊息", "success");
    },
    mounted() {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip();
      });
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
