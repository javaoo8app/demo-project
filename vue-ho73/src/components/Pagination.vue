<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{'disabled':!propPage.has_pre}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getProducts(propPage.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in propPage.total_pages"
          :key="page"
          :class="{'active' : propPage.current_page === page }"
        ><a
            class="page-link"
            href="#"
            @click.prevent="getProducts(page)"
          >{{ page }}</a></li>
        <li
          class="page-item"
          :class="{'disabled' : !propPage.has_next}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getProducts(propPage.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ["propPage"],
    data() {
      return {};
    },
    methods: {
      getProducts(page) {
        this.$emit("changePage", page);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-link:focus {
    outline: none !important;
    box-shadow: none !important;
  }
</style>
