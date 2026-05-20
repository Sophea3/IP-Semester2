import { gql } from '@apollo/client/core'

// =========================
// GET TODOS
// =========================
export const GET_TODOS = gql`
  query GetTodos {
    todo(order_by: { create_at: desc }) {
      id
      title
      is_done
      create_at
    }
  }
`

// =========================
// ADD TODO
// =========================
export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    insert_todo(
      objects: {
        title: $title
        is_done: false
      }
    ) {
      returning {
        id
        title
        is_done
        create_at
      }
    }
  }
`

// =========================
// TOGGLE TODO
// =========================
export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: uuid!, $is_done: Boolean!) {
    update_todo_by_pk(
      pk_columns: { id: $id }
      _set: { is_done: $is_done }
    ) {
      id
      is_done
    }
  }
`

// =========================
// DELETE TODO
// =========================
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: uuid!) {
    delete_todo_by_pk(id: $id) {
      id
    }
  }
`

// =========================
// SUBSCRIPTION
// =========================
export const TODOS_SUB = gql`
  subscription TodosSub {
    todo(order_by: { create_at: desc }) {
      id
      title
      is_done
      create_at
    }
  }
`