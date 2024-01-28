<!-- Source: https://thewebdev.info/2021/01/15/create-a-to-do-list-with-vue-3-and-javascript/ -->
<!-- probably don't need this file -->

<template>
    <div>
      <form @submit.prevent="add">
        <input v-model="todo" />
        <button type="submit">Add</button>
      </form>
  
      <div v-for="(todo, index) of todos" :key="todo.id">
        {{ todo.todo }}
        <button @click="deleteTodo(index)">delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from "uuid";
  
  export default {
    name: "App",
    data() {
      return {
        todo: "",
        todos: [],
      };
    },
    methods: {
      add() {
        const { todo } = this;
        this.todos.push({
          id: uuidv4(),
          todo,
        });
        this.todo = "";
      },
      deleteTodo(index) {
        this.todos.splice(index, 1);
      },
    },
  };
  </script>