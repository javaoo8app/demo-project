<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>
<script>
export default {
  name: 'FormInputBindings',
  data () {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>
