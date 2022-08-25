<template>
  <div class="flex flex-col items-center max-w-lg mx-auto my-10 bg-white p-5 rounded-xl shadow shadow-slate-300">
    <h1 class="text-2xl font-medium pb-1">Añade una tarea!</h1>
    <p class="text-xs p-4 text-gray-400"> {{time}}</p>
    <input class="w-full my-1 py-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" v-model="title" type="texto" placeholder="Titulo" />
    <input class="w-full my-1 py-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" v-model="description" type="texto" placeholder="Descripción" />
    <button @click="addTask" class="w-full border-x border-y border-emerald-400 mt-1 py-1 rounded-md text-emerald-400 font-bold hover:bg-emerald-400 hover:text-gray-100 transition duration-3000">Añadir Tarea</button>
  </div>
</template>

<script setup>
import { ref} from "vue";

// constant to save a variable that holds the value of the title input field of the new task
const title = ref("");

// constant to save a variable that holds the value of the description input field of the new task
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const errorMsgContainer = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMsg = ref("");

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(['addTask']);

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addTask = async () => {
  if (title.value) {
    emit("addTask",title.value,description.value);
    title.value = "";
    description.value = "";
  } else {
    errorMsg.value = `Error: Debe añadir un Titulo a la tarea!`;
    errorMsgContainer.value = true;
    setTimeout(() => {
       errorMsg.value = null;
       errorMsgContainer.value = false;
     }, 5000);
  }
};
</script>

<style>
</style>
