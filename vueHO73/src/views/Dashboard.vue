<template>
  <div>
    <Navbar class="sticky-top" />
    <Alert />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from "@/components/NavbarFund.vue";
  import Alert from "@/components/AlertMessage.vue";

  export default {
    components: {
      Navbar,
      Alert
    }
  };
</script>


