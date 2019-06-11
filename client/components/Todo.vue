<template>
  <div>
    <v-divider />
    <section v-if="error">
        <div class="text-xs-center">Error fetching data</div>
    </section>
    <section v-else>
        <section v-if="loading">
            <center><v-progress-circular indeterminate color="primary" /></center>
        </section>
        <section v-else>
            <div v-for="(todo, index) in todos" v-bind:key="todo.id">
                <v-card width=500>
                    <v-card-title class="headline">{{ todo.title }}</v-card-title>
                    <v-card-text>
                        <p>{{ todo.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-checkbox @click='editStatus(todo.id, index, todo.isComplete)' color='pink' v-model="todo.isComplete" v-bind:label='todo.isComplete ? "Completed":"Incomplete"'></v-checkbox>
                        <v-spacer></v-spacer>
                        <!-- <v-btn flat color="yellow" icon @click="edit(todo.id)"><v-icon>edit</v-icon></v-btn> -->
                        <v-tooltip right><template v-slot:activator="{ on }">
                          <v-btn
                          flat
                          color="red"
                          icon
                          v-on="on"
                          @click="deleteTodo(todo.id, index)"
                        ><v-icon>delete</v-icon></v-btn>
                        </template>
                        <span>Delete</span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
                <v-divider />
            </div>
        </section>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
var BASE_URL = process.env.BASE_URL
export default {
  name: 'Todo',
  data() {
    return { todos: [], loading: false, error: null }
  },
  mounted() {
    console.log('mounted')
    this.getTodoList()
  },
  methods: {
    getTodoList() {
      this.loading = true    
      axios
        .get(BASE_URL + '/api/todos')
        .then((resp) => {
          this.loading = false
          if(typeof resp.data == 'object')
            this.todos = resp.data
          else
            this.error = "API Error"
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          this.error = err.message
        })
    },
    deleteTodo(id, index){
      axios.delete(BASE_URL + '/api/todos/'+id).catch(err=>console.log(err)).finally(()=>{
        this.todos.splice(index, 1)
      });
    },
    editStatus(id, index, status){
      axios.patch(BASE_URL + '/api/todos/'+id, { isComplete: !status }).catch(err=>console.log(err)).finally(()=>{
        this.todos[index].isComplete = !status
      });
    }
  }
}
</script>
