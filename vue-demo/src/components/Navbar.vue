<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="info"
    class="fixed-top bg-dark"
  >
    <b-navbar-brand href="#">{{ msg }}</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse
      is-nav
      id="nav_collapse"
    >
      <b-navbar-nav
        id="Navbar"
        v-for="item in menu"
        :key=item.index
      >
        <b-nav-item-dropdown
          v-if="item.dropdown"
          v-bind:text="item.name"
        >
          <b-dropdown-item
            v-for="it in item.dropdown"
            :key=it.index
            :to="it.path"
          >{{ it.name }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item
          v-else
          :to="item.path"
        >{{ item.name }}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->

    </b-collapse>
  </b-navbar>

  <!-- navbar-1.vue -->
</template>
<script>
// import store from '@/store/store'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  props: ['menuList'],
  computed: { ...mapGetters(['getMenu']) },
  data () {
    return {
      msg: 'Vue.js App',
      menu: ''
    }
  },
  created () {
    this.menu = this.getMenu
  }
}
</script>
