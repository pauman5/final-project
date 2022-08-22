<template>
  <div>
    <h2>Añadir Tarea</h2>
    <input v-model="title" type="texto" placeholder="Titulo" />
    <input v-model="description" type="texto" placeholder="Descripción" />
    <button @click="addTask">Añadir Tarea</button>
  </div>
</template>

<script setup>
import { ref} from "vue";
import { useTaskStore } from "../stores/task";

// constant to save a variable that define the custom event that will be emitted to the homeView
const taskType = ref("");

// constant to save a variable that holds the value of the title input field of the new task
const title = ref("");

// constant to save a variable that holds the value of the description input field of the new task
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const errorMsgContainer = false;

// const constant to save a variable that holds the value of the error message
const errorMsg = ref("");

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addTask = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    useTaskStore().addTask(title.value,description.value)
    
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
