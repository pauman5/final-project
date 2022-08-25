<template>
  <div class="flex flex-col items-center max-w-lg mx-auto my-10 bg-white p-5 rounded-xl shadow shadow-slate-300">
    <h1 class="text-3xl font-bold">¡Añade una tarea!</h1>
    <p class="text-xs p-4 text-gray-400">Hoy es dia {{time}}</p>
    <input 
      class="w-full my-1 py-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
      v-model="title" 
      type="texto" 
      placeholder="Titulo" />
    <input 
      class="w-full my-1 py-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
      v-model="description" 
      type="texto" 
      placeholder="Descripción" />
    <button @click="addTask" class="w-full border-x border-y border-emerald-400 mt-1 py-1 rounded-md text-emerald-400 font-bold hover:bg-emerald-400 hover:text-gray-100 transition duration-3000">Añadir Tarea</button>
  </div>
</template>

<script setup>
import { ref} from "vue";
import moment from "moment";

const title = ref("");

const description = ref("");

const errorMsgContainer = ref(false);

const errorMsg = ref("");

const emit = defineEmits(['addTask']);

const time = moment().format('LL');

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
