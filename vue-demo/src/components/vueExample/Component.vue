<template>
  <div>
    <!-- 'toodo-item'組件需要時才匯入，詳見:components/vueExample/toodoItem.vue。 -->
    <toodo-item></toodo-item>
  </div>
</template>

<script>
import toodoItem from '@/components/vueExample/toodoItem'
export default {
  data () {
    return {
    //  columns:[
    //         {
    //             title: '姓名',
    //             key: 'name'
    //         },
    //         {
    //             title: '年齡',
    //             key: 'age',
    //             sortable: true
    //         },   
    //         {
    //             title: '出生日期',
    //             key: 'birthday',
    //             sortable: true
    //         },
    //         {
    //             title: '地址',
    //             key: 'address'
    //         }
    //     ],
    //     data:[
    //         {
    //             name: '王曉明',
    //             age: 18,
    //             birthday:'1999-08-09',
    //             address: '台灣新北市三峽區'
    //         },
    //         {
    //             name: '陳曉東',
    //             age: 48,
    //             birthday:'1959-04-19',
    //             address: '台灣新北市淡水區'
    //         }
    //     ]
    }
  },
  components: {
    toodoItem
  }
}
</script>
