<template>
  <div
    :data="data"
    :columns="columns"
  >{{message}}</div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {
      currentColumns: [],
      currentData: [],
      message: 'I am here  ' + new Date().toLocaleString()
    }
  },
  render: function (h) {
    var _this = this

    var ths = []
    this.currentColumns.forEach(function (col, index) {
      if (col.sortable) {
        ths.push(h('th', [
          h('span', col.title),
          // 升冪
          h('a', {
            class: {
              on: col._sortType === 'asc'
            },
            on: {
              click: function () {
                _this.handleSortByAsc(index)
              }
            }
          }, '↑'),
          // 降冪
          h('a', {
            class: {
              on: col._sortType === 'desc'
            },
            on: {
              click: function () {
                _this.handleSortByDesc(index)
              }
            }
          }, '↓')
        ]))
      } else {
        this.push(h('th', col.title))
      }
    })

    var trs = []
    this.currentData.forEach(function (row) {
      var tds = []
      _this.currentColumns.forEach(function (cell) {
        tds.push(h('td', row[cell.key]))
      })
      trs.push(h('tr', tds))
    })
    return h('table', [
      h('thead', [
        h('tr', ths)
      ]),
      h('tbody', trs)
    ])
  },
  methods: {
    makeColumns: function () {
      this.currentColumns = this.columns.map(function (col, index) {
        // 增加一個欄位標誌目前排序的狀態，後續使用
        col._sortType = 'normal'
        // 增加一個欄位標誌目前列在陣列中的索引，後續使用
        col.index = index
        return col
      })
    },
    makeData: function () {
      this.currentData = this.data.map(function (row, index) {
        // 增加一個欄位標誌目前列在陣列中的索引，後續使用
        row._index = index
        return row
      })
    }
  },
  mounted () {
    // v-table 初始化時呼叫
    this.makeColumns()
    this.makeData()
  }

}
</script>
