import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      console.log("Imprimiendo lista de tareas de user:");
      console.log(useUserStore().user.id);
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      console.log("Tarea añadida!");
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    async deleteTask(taskId) {
      console.log("Tarea eliminada!");
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
    },
    async toggleReminder(taskId, toggleValue) {
      console.log("Cambio estado de tarea.");
      const { data, error } = await supabase
        .from('tasks')
        .update({ 'is_complete': toggleValue })
        .eq('id', taskId);
    },
    async editTitle(taskId, newTitle) {
      console.log("Titulo Tarea editado!");
      const { data, error } = await supabase
        .from('tasks')
        .update({ 'title': newTitle })
        .eq('id', taskId);
    },
    async editDescription(taskId, newDescription) {
      console.log("Descripcion Tarea editada!");
      const { data, error } = await supabase
        .from('tasks')
        .update({ 'description': newDescription })
        .eq('id', taskId);
    },
  },
});
