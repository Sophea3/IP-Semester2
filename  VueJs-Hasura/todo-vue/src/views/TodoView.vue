<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  computed
} from 'vue'

import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();

const title = ref("");

const filter = ref('all');

// =========================
// FILTERED TODOS
// =========================
const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todoStore.activeTodos
  }

  if (filter.value === 'done') {
    return todoStore.doneTodos
  }

  return todoStore.todos
})

// optional realtime unsubscribe function
let stopRealtime: null | (() => void) = null;

// =========================
// LOAD DATA
// =========================
onMounted(async () => {
  await todoStore.fetchTodos();

  // optional realtime
  stopRealtime = todoStore.startRealtime();
});

// cleanup realtime when leaving page
onBeforeUnmount(() => {
  stopRealtime?.();
});

// =========================
// ADD TODO
// =========================
function onAdd() {
  todoStore.addTodo(title.value);
  title.value = "";
}
</script>

<template>
  <div class="p-4 max-w-xl mx-auto">

    <h1 class="text-2xl font-bold mb-4">
      Todo App
    </h1>

    <!-- ADD TODO -->
    <div class="flex gap-2 mb-4">
      <input
        v-model="title"
        placeholder="Enter todo..."
        class="border p-2 flex-1"
      />

      <button
        @click="onAdd"
        class="bg-blue-500 text-white px-4 py-2"
      >
        Add
      </button>
    </div>

    <!-- FILTER BUTTONS -->
    <div class="flex gap-2 mb-4">
      <button @click="filter = 'all'">
        All
      </button>

      <button @click="filter = 'active'">
        Active
      </button>

      <button @click="filter = 'done'">
        Done
      </button>
    </div>

    <!-- LOADING -->
    <p v-if="todoStore.loading">
      Loading...
    </p>

    <!-- ERROR -->
    <p
      v-if="todoStore.error"
      class="text-red-500"
    >
      {{ todoStore.error }}
    </p>

    <!-- TODO LIST -->
      <!-- v-for="todo in todoStore.todos" -->
    <ul>
  <li
    v-for="todo in filteredTodos"
    :key="todo.id"
    class="flex items-center justify-between border-b py-2"
  >
    <!-- LEFT SIDE -->
    <div class="flex items-center gap-2">

      <input
        type="checkbox"
        :checked="todo.is_done"
        @change="todoStore.toggleTodo(todo)"
      />

      <span :class="{ 'line-through': todo.is_done }">
        {{ todo.title }}
      </span>

    </div>

    <!-- DELETE -->
    <button
      @click="todoStore.deleteTodo(todo.id)"
      class="text-red-500"
    >
      Delete
    </button>
  </li>
</ul>

  </div>
</template>




