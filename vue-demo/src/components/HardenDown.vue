<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1 class="mt-5">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HardenDown',
  data () {
    return {
      msg: '這是連結二，所以 Harden 躺著'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello img {
    transform: perspective(600px) rotateX(80deg);
  }
</style>
