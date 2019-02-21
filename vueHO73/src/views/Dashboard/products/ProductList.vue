<template>
  <div>
    <div class="container-fluid mt-4 main">
      <form class="form-inline d-flex">
        <!-- 使用 ml-auto 搭配 d-flex，將按鈕推到最右邊  -->
        <div class="input-group input-group-sm mb-2 mb-sm-0">
          <input
            type="text"
            class="form-control"
            placeholder="Search for..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            data-toggle="tooltip"
            data-placement="top"
            title="按下 Enter 快速收尋"
          >
          <div class="input-group-append ">
            <button
              class="btn btn-secondary"
              type="button"
              id="button-addon2"
            ><i class="fas fa-search"></i></button>
          </div>
        </div>
        <div class="text-right ml-auto">
          <button
            id="ho73-btn"
            class="btn btn-info"
          >
            <a>建立新產品</a>
          </button>
        </div>
      </form>

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
            <tr>
              <td>一般商品</td>
              <td>愛心餅乾</td>
              <td class="text-right">10000</td>
              <td class="text-right">200</td>
              <td>
                <span class="text-success">啟用</span>
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
                    data-toggle="modal"
                    data-target="#editModal"
                    data-title="訂單【00112255】"
                    data-name="Mark"
                    data-email="Mark@mail.com"
                    data-product="0"
                    data-number="2"
                    data-backdrop="static"
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
                      <a
                        class="dropdown-item text-danger"
                        href="#"
                        data-toggle="modal"
                        data-target="#removeModal"
                        data-title="刪除訂單【00112255】"
                      >刪除</a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>一般商品</td>
              <td>愛心餅乾</td>
              <td class="text-right">10000</td>
              <td class="text-right">200</td>
              <td>
                <span class="text-success">啟用</span>
              </td>
              <td>
                <div
                  class="btn-group btn-group-sm"
                  role="group"
                  aria-label="Button group with nested dropdown"
                  id="ho73-btn-gp"
                >
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-toggle="modal"
                    data-target="#editModal"
                    data-title="訂單【00112255】"
                    data-name="Mark"
                    data-email="Mark@mail.com"
                    data-product="0"
                    data-number="2"
                    data-backdrop="static"
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
                      <a
                        class="dropdown-item text-danger"
                        href="#"
                        data-toggle="modal"
                        data-target="#removeModal"
                        data-title="刪除訂單【00112255】"
                      >刪除</a>
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
</template>

<script>
  export default {
    components: {}
  };
</script>

<style lang="scss" scoped>
  #ho73-btn {
    color: #ffffff;
  }

  #ho73-btn :hover {
    outline: none !important;
    box-shadow: none !important;
  }
</style>
