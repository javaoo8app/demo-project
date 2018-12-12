<template>
  <p v-if="seen">Now you see me</p>
</template>
<script>
export default {
  data () {
    return {
      seen: true
    }
  }
}
</script>
