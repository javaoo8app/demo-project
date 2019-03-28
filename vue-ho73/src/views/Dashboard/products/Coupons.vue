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
      <div class="text-right mt-4">
        <button
          class="btn btn-info"
          @click="openModal(isNew = true)"
        >建立新的優惠券</button>
      </div>
      <table class="table my-3">
        <thead>
          <th width="120">標題</th>

          <th width="100">折扣</th>
          <th width="100">優惠碼</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </thead>
        <tbody>
          <tr
            v-for="item in coupons"
            :key="item.id"
          >
            <td>{{item.title }}</td>
            <td>{{item.percent}} %</td>
            <td>{{item.code}}</td>
            <td>
              <span
                v-if="item.is_enabled"
                class="text-success"
              >啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="openModal(isNew = false,item)"
                >編輯</button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="deletModal(item)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <Pagination
        @changePage="getCoupons"
        :propPage="pagination"
      ></Pagination>
    </div>

    <!-- couponModal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-md"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span>新增優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="container">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempCoupon.title"
                >
              </div>

              <div class="form-group ">
                <label for="percent">折扣</label>
                <input
                  type="number"
                  class="form-control"
                  id="percent"
                  placeholder="請輸入折扣"
                  v-model="tempCoupon.percent"
                >
              </div>
              <div class="form-group ">
                <label for="code">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  placeholder="請輸入優惠碼"
                  v-model="tempCoupon.code"
                >
              </div>

              <div class="form-group">
                <label for="due_date">期限</label>
                <input
                  type="date"
                  class="form-control"
                  id="due_date"
                  placeholder="請輸入日期"
                  v-model="tempCoupon.due_date"
                >
              </div>

              <hr>

              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="tempCoupon.is_enabled"
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-info"
              @click="updateCoupon"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delcouponModal -->
    <div
      class="modal fade"
      id="delcouponModal"
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
              <span>刪除優惠券</span>
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
            是否刪除 <strong class="text-primary">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
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
              @click="deletOK"
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
        coupons: [], //全部資料
        tempCoupon: {}, //暫時存取編輯、刪除所選的資料
        isNew: true, //判斷是否是新資料
        isLoading: false, //控制全畫面loading效果
        status: {
          fileUploading: false //控制loading icon
        },
        pagination: {}
      };
    },
    methods: {
      //取得遠端資料
      getCoupons(page = 1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/admin/coupons?page=${page}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          console.log(response.data);
          vm.isLoading = false;
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        });
      },
      //打開Modal
      openModal(isNew, item) {
        //判斷是否是新資料
        if (isNew) {
          this.tempCoupon = {};
          isNew = true;
        } else {
          //不是新的話，就將該商品傳入tempCoupon，但為避免傳參考，使用ES6物件方法
          const vm = this;
          vm.tempCoupon = Object.assign({}, item);
          //將日期轉換成YY-MM-DD格式才能顯示
          let YY = new Date(vm.tempCoupon.due_date).getFullYear().toString();
          let MM =
            (new Date(vm.tempCoupon.due_date).getMonth() + 1 < 10 ? "0" : "") +
            (new Date(vm.tempCoupon.due_date).getMonth() + 1);
          let DD =
            (new Date(vm.tempCoupon.due_date).getDate() < 10 ? "0" : "") +
            new Date(vm.tempCoupon.due_date).getDate();
          vm.tempCoupon.due_date = `${YY}-${MM}-${DD}`;
          isNew = false;
        }
        $("#couponModal").modal("show");
      },
      //確認鍵
      updateCoupon() {
        let api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/admin/coupon`;
        let httpMethod = "post";
        const vm = this;
        //將表單日期YY-MM-DD格式轉成unix timestamp格式
        //   vm.tempCoupon.due_date = Math.floor(new Date(vm.tempCoupon.due_date))
        vm.tempCoupon.due_date = new Date(vm.tempCoupon.due_date).getTime();
        if (!vm.isNew) {
          api = `${process.env.VUE_APP_APIPATH}/api/${
            process.env.VUE_APP_CUSTOMPATH
          }/admin/coupon/${vm.tempCoupon.id}`;
          httpMethod = "put";
        }
        this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
          if (response.data.success) {
            $("#couponModal").modal("hide");
            vm.getCoupons();
          } else {
            $("#couponModal").modal("hide");
            vm.getCoupons();
            console.log("新增失敗");
          }
        });
      },
      //打開刪除Modal
      deletModal(item) {
        this.tempCoupon = Object.assign({}, item);
        $("#delcouponModal").modal("show");
      },
      //確認刪除
      deletOK() {
        const vm = this;
        let api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/admin/coupon/${vm.tempCoupon.id}`;
        this.$http.delete(api, { data: vm.tempCoupon }).then(response => {
          if (response.data.success) {
            $("#delcouponModal").modal("hide");
            vm.getCoupons();
          } else {
            $("#delcouponModal").modal("hide");
            vm.getCoupons();
            console.log("刪除失敗");
          }
        });
      }
    },
    created() {
      this.getCoupons();
    }
  };
</script>

<style lang="scss" scoped>
  // #ho73-btn :hover,
  // .close {
  //   outline: none !important;
  //   box-shadow: none !important;
  // }
  .img-center {
    text-align: center;
    zoom: 0.8;
  }
</style>
