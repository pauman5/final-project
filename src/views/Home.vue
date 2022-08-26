<template>
  <div class="">
    <Nav />
    <NewTask
      @addTask="addTask"
    />
    <div class="min-h-screen flex flex-wrap items-center justify-center relative">
      <div
        v-for="task in tasks" 
        :key="task.id"
        class="w-96 my-2"
      >
        <TaskItem 
          :task="task"
          @deleteTask="deleteTask"
          @toggleReminder="toggleReminder"
          @editTask="editTask"
        />
      </div>
      <Footer/>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Footer from "../components/Footer.vue";

const tasks = ref([])

const errorMsg = ref(null);

const fetchTasks = async () => {
  try {
    tasks.value = await useTaskStore().fetchTasks();
    if (error) throw error;
    console.log(tasks.value);
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = false;
    }, 5000)
  }
};

fetchTasks();

const addTask = async (taskTitle,taskDescription) => {
    try {
      await useTaskStore().addTask(taskTitle,taskDescription)
      fetchTasks();
      if (error) throw error;
      console.log(tasks.value);
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};

const deleteTask = async (taskId) => {
    try {
      await useTaskStore().deleteTask(taskId);
      fetchTasks();
      if (error) throw error;
      console.log(tasks.value);
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};

const toggleReminder = async (taskId,newValue) => {
    try {
      await useTaskStore().toggleReminder(taskId,newValue);
      fetchTasks();
      if (error) throw error;
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};

const editTask = async (taskId,newTitle,newDescription) => {
    try {
      await useTaskStore().editTitle(taskId,newTitle);
      await useTaskStore().editDescription(taskId,newDescription);
      fetchTasks();
      if (error) throw error;
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};
</script>

<style>
</style>
