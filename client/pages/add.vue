<template>
    <div>
        <v-layout column justify-center align-center>
            <v-flex>
                <v-text-field v-model="title" label="Title" type="text" />
                <v-text-field v-model="description" label="Description" type="text" />
                <v-btn @click="addNewTodo()">ADD</v-btn>
                <v-snackbar v-model="snackbar">{{ msg }}<nuxt-link to="/"><v-btn color='pink' flat @click='snackbar = false'>VIEW</v-btn></nuxt-link></v-snackbar>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
var BASE_URL = process.env.BASE_URL

export default {
    name: 'add',
    data() {
        return { title: "", description: "", msg:null, snackbar: false }
    },
    methods:{
        addNewTodo(){
            axios.post(BASE_URL + '/api/todos', { title: this.title, description: this.description }).then(resp=>{
                console.log(resp.data)
                if(resp.data.id){
                    this.snackbar = true
                    this.msg = "Created a new Todo item"
                }
                else{
                    this.snackbar = true
                    this.msg = "An Error occured."
                }
            }).catch(err=>{
                console.log(err)
                this.snackbar = true
                this.msg = "An Error occured"
            })
        }
    }
}
</script>
