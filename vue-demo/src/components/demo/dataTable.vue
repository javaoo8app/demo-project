<template>
  <div>
    <thead>
      <tr>
        <th>
          {{key | capitalize}}
          <span
            class="arrow"
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"
          >
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
