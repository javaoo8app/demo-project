<template>
  <div>
    'toodo-item'組件需要時才匯入，詳見:components/vueExample/toodoItem.vue。
    <toodo-item></toodo-item>
  </div>
</template>

<script>
import toodoItem from '@/components/vueExample/toodoItem'
export default {
  name: 'ComponentL',
  components: {
    toodoItem
  }
}
</script>
