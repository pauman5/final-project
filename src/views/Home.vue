<template>
  <div class="home">
    <Nav />
    <NewTask
      @addTask="addTask"
    />
    <div
      class="flex flex-wrap"
      v-for="task in tasks" 
      :key="task.id"
    >
      <TaskItem 
        :task="task"
        @deleteTask="deleteTask"
        @toggleReminder="toggleReminder"
        @editTask="editTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";

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
      // calls the user store and send the users info to backend to logIn
      await useTaskStore().addTask(taskTitle,taskDescription)
      fetchTasks();
      if (error) throw error;
      console.log(tasks.value);
    } catch (error) {
      // displays error message
      errorMsg.value = `Error: ${error.message}`;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};

const deleteTask = async (taskId) => {
    try {
      // calls the user store and send the users info to backend to logIn
      await useTaskStore().deleteTask(taskId);
      fetchTasks();
      if (error) throw error;
      console.log(tasks.value);
    } catch (error) {
      // displays error message
      errorMsg.value = `Error: ${error.message}`;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};

const toggleReminder = async (taskId,newValue) => {
    try {
      // calls the user store and send the users info to backend to logIn
      await useTaskStore().toggleReminder(taskId,newValue);
      fetchTasks();
      if (error) throw error;
    } catch (error) {
      // displays error message
      errorMsg.value = `Error: ${error.message}`;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
};

const editTask = async (taskId,newTitle,newDescription) => {
    try {
      // calls the user store and send the users info to backend to logIn
      await useTaskStore().editTitle(taskId,newTitle);
      await useTaskStore().editDescription(taskId,newDescription);
      fetchTasks();
      if (error) throw error;
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

<style>
</style>
