<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <h1>Todos</h1>
      </div>
      <Todo />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
import Todo from '~/components/Todo.vue'

export default {
  components: {
    Todo
  }
}
</script>
