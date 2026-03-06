import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),

  getters: {
    countTodos: (state) => {
      return state.todos.filter(task => task.completedAt === null).length;
    }
  },

  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get("http://localhost:3100/tasks");
        this.todos = response.data;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },

    async toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        const todo = this.todos[foundIndex];
        const isCompleting = !todo.completedAt;
        try {
          const endpoint = isCompleting ? `http://localhost:3100/tasks/${id}/done` : `http://localhost:3100/tasks/${id}/pending`;
          await axios.patch(endpoint, {});
          await this.fetchTodos();
        } catch (error) {
          console.error("Failed to toggle status:", error);
        }
      }
    },

    async addTodo(todo) {
      try {
        await axios.post("http://localhost:3100/tasks", {
          name: todo,
          description: "description",
        });
        await this.fetchTodos();
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },

    clearAll() {
      this.todos = [];
    },
  },
});