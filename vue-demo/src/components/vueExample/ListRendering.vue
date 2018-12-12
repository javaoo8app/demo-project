<template>
  <ol>
    <li
      v-for="todo in todos"
      :key=todo.index
    >
      {{ todo.text }}
    </li>
  </ol>
</template>
<script>
export default {
  data () {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}
</script>
