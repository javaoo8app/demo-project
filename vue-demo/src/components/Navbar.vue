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
          v-bind:text="item.title"
        >
          <b-dropdown-item
            v-for="it in item.dropdown"
            :key=it.index
            :to="it.url"
          >{{ it.title }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item
          v-else
          :to="item.url"
        >{{ item.title }}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->

    </b-collapse>
  </b-navbar>

  <!-- navbar-1.vue -->
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'Vue.js App',
      menu: [
        { title: 'HOME',
          url: '/' },
        { title: 'Vue example',
          dropdown: [
            {title: '01 - Hello Vue',
              url: '/HelloVue'},
            {title: '02 - Bind Message',
              url: '/BindMessage'},
            {title: '03 - Conditional Rendering',
              url: '/ConditionalRendering'},
            {title: '04 - List Rendering',
              url: '/ListRendering'},
            {title: '05 - Event Handling',
              url: '/EventHandling'},
            {title: '06 - Form Input Bindings',
              url: '/FormInputBindings'},
            {title: '07 - Component',
              url: '/Component'}
          ] }
      ]
    }
  }
}
</script>
