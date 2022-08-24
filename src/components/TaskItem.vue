<template>
  <div @click="$emit('toggleReminder',task.id,!task.is_complete)" class="m-auto my-1 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-white shadow-xl">
    <div class="h-12 bg-emerald-100 flex flex-row justify-between px-4">
      <button @click="$emit('deleteTask',task.id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
      <button @click="changeEditing">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-600 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      </button>
    </div>
    <div class="-mt-10 flex justify-center">
      <img class="h-20 rounded-full" src="https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=" />
    </div>
    <div class="mt-2 mb-1 px-3 text-center text-lg font-medium">{{ task.title }}</div>
    <input v-if="editing" v-model="newTitle" type="texto" placeholder="Nuevo Titulo"/>
    <p class="mb-5 px-3 text-center text-sky-500">{{ task.description }}</p>
    <input v-if="editing"  v-model="newDescription" type="texto" placeholder="Nueva Descripción" />
    <button v-if="editing" @click="editTask(task)">
      Guardar Cambios
    </button>
    <div class="text-xs text-slate-500 flex flex-row justify-between px-6 pb-1">
      <p class="flex flex-row content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-4 h-4 pr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        {{ task.inserted_at.slice(0,10) }}
      </p>
      <p v-if="task.is_complete">Done</p>
      <p class="flex flex-row content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-4 h-4 pr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ task.inserted_at.slice(11,16) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref} from "vue";

const props = defineProps({
  task: Object,
});

let editing = ref(false);

const errorMsg = ref("");

const newTitle = ref("");

const newDescription = ref("");

const emit = defineEmits(['deleteTask', 'toggleReminder', 'editTask']);

const changeEditing = () => {
  editing.value = !editing.value;
};

const editTask = (task) => {
  if (newTitle.value && newDescription.value) {
    emit("editTask",task.id,newTitle.value,newDescription.value);
  } else if (!newDescription.value) {
    emit("editTask",task.id,newTitle.value,task.description);
  } else if (!newTitle.value) {
    emit("editTask",task.id,task.title,newDescription.value);
  } else {
    errorMsg.value = `Error: Debe rellenar algun campo para editar`;
    errorMsgContainer.value = true;
    setTimeout(() => {
       errorMsg.value = null;
       errorMsgContainer.value = false;
     }, 5000);
  }
  editing.value = false;
};

</script>

<style></style>