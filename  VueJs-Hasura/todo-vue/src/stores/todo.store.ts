import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apolloClient } from "@/apollo/client";

import {
  GET_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  TODOS_SUB,
} from "@/graphql/todos";

// =========================
// TYPES
// =========================
export type Todo = {
  id: number; // FIX: Hasura usually returns Int, not string
  title: string;
  is_done: boolean;
  create_at: string;
};

// =========================
// STORE
// =========================
export const useTodoStore = defineStore("todo", () => {
  // =========================
  // STATE
  // =========================
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const activeTodos = computed(() => //use filter by all, active, or done todos
  todos.value.filter((todo) => !todo.is_done)
)

const doneTodos = computed(() =>
  todos.value.filter((todo) => todo.is_done)
)
  // =========================
  // FETCH TODOS
  // =========================
  async function fetchTodos() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await apolloClient.query<{ todo: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: "network-only",
      });

      todos.value = data.todo;
    } catch (e: any) {
      error.value = e.message ?? "Failed to load todos";
    } finally {
      loading.value = false;
    }
  }

  // =========================
  // ADD TODO
  // =========================
  // async function addTodo(title: string) {
  //   const clean = title.trim();
  //   if (!clean) return;

  //   try {
  //     await apolloClient.mutate({
  //       mutation: ADD_TODO,
  //       variables: { title: clean },
  //     });

  //     await fetchTodos();
  //   } catch (e: any) {
  //     error.value = e.message ?? "Failed to add todo";
  //   }
  // }
  async function addTodo(title: string) { // Better Apollo cache update instead of refetching
  const clean = title.trim();
  if (!clean) return;

  try {
    await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: {
        title: clean,
      },

      update(cache, { data }: any) {
        // ⚠️ mutation result safety check
        const newTodo = data?.insert_todo_one;
        if (!newTodo) return;

        try {
          const existing: any = cache.readQuery({
            query: GET_TODOS,
          });

          cache.writeQuery({
            query: GET_TODOS,
            data: {
              todo: [
                ...(existing?.todo ?? []),
                newTodo,
              ],
            },
          });
        } catch (e) {
          // if cache is empty, just ignore
        }
      },
    });
  } catch (e: any) {
    error.value = e.message ?? "Failed to add todo";
  }
}

  // =========================
  // TOGGLE TODO
  // =========================
  // async function toggleTodo(todo: Todo) {
  //   try {
  //     await apolloClient.mutate({
  //       mutation: TOGGLE_TODO,
  //       variables: {
  //         id: todo.id,
  //         is_done: !todo.is_done, // FIX: must match your DB column
  //       },
  //     });

  //     await fetchTodos();
  //   } catch (e: any) {
  //     error.value = e.message ?? "Failed to update todo";
  //   }
  // }
  async function toggleTodo(todo: Todo) { // optimistic UI update
  const old = todo.is_done

  // update UI instantly
  todo.is_done = !todo.is_done

  try {
    await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: {
        id: todo.id,
        is_done: todo.is_done,
      },
    })
  } catch (e: any) {
    // rollback if error
    todo.is_done = old
    error.value = e.message ?? "Failed to update todo"
  }
}

  // =========================
  // DELETE TODO
  // =========================
  // async function deleteTodo(id: number) {
  //   try {
  //     await apolloClient.mutate({
  //       mutation: DELETE_TODO,
  //       variables: { id },
  //     });

  //     await fetchTodos();
  //   } catch (e: any) {
  //     error.value = e.message ?? "Failed to delete todo";
  //   }
  // }
  async function deleteTodo(id: number) { // optimistic UI update
  const oldTodos = [...todos.value]

  // remove instantly from UI
  todos.value = todos.value.filter(
    (todo) => todo.id !== id
  )

  try {
    await apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: { id },
    })
  } catch (e: any) {
    // rollback if error
    todos.value = oldTodos
    error.value = e.message ?? "Failed to delete todo"
  }
}
  // =========================
  // REALTIME (SUBSCRIPTION)
  // =========================
  function startRealtime() {
    const obs = apolloClient.subscribe<{ todo: Todo[] }>({
      query: TODOS_SUB,
    });

    const sub = obs.subscribe({
      next: ({ data }) => {
        if (data?.todo) {
          todos.value = data.todo;
        }
      },
      error: (e) => {
        console.error("Subscription error:", e);
      },
    });

    return () => sub.unsubscribe();
  }

  // =========================
  // RETURN
  // =========================
  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
    activeTodos,
    doneTodos,
  };
});