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
                    <section v-if="edititem && index==edititem.index">
                      <v-card-title>
                        <v-text-field v-model="edititem.title" label="Title" type="text" />
                      </v-card-title>
                      <v-card-text>
                        <v-text-field v-model="edititem.description" label="Description" type="text" />
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color='yellow' @click='editTodo(edititem.id, edititem.index, edititem.title, edititem.description)'>EDIT TODO</v-btn>
                        <v-btn color='red' @click='edititem = null'>CANCEL</v-btn>
                      </v-card-actions>
                    </section>
                    <section v-else>
                    <v-card-title class="headline">{{ todo.title }}</v-card-title>
                    <v-card-text>
                      <p>{{ todo.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-checkbox @click='changeStatus(todo.id, index, todo.isComplete)' color='pink' v-model="todo.isComplete" v-bind:label='todo.isComplete ? "Completed":"Incomplete"'></v-checkbox>
                        <v-spacer></v-spacer>
                        <v-tooltip top><template v-slot:activator="{ on }">
                        <v-btn v-on="on" flat color="yellow" icon @click="showEditBox(todo.id, index)"><v-icon>edit</v-icon></v-btn>
                        </template>
                        <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top><template v-slot:activator="{ on }">
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
                    </section>
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
    return { todos: [], loading: false, error: null, edititem:null }
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
    changeStatus(id, index, status){
      axios.patch(BASE_URL + '/api/todos/'+id, { isComplete: !status }).catch(err=>console.log(err)).finally(()=>{
        this.todos[index].isComplete = !status
      });
    },
    showEditBox(id, index){
      this.edititem = { id: id, index: index, title: this.todos[index].title, description: this.todos[index].description }
    },
    editTodo(id, index, title, description){
      axios.patch(BASE_URL + '/api/todos/'+id, {title:title, description:description}).catch(err=>console.log(err)).finally(()=>{
        this.edititem = null
        this.todos[index].title = title
        this.todos[index].description = description
      });
    }
  }
}
</script>
