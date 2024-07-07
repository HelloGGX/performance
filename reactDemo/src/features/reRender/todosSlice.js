// src/features/todos/todosSlice.js
import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter();

const initialTodos = {
  todos: Array.from({ length: 100000 }, (_, index) => ({
    id: nanoid(),
    title: `Todo ${index}`,
    completed: false,
  })),
};
const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    initializeTodos: (state) => {
      todosAdapter.setAll(state, initialTodos.todos);
    },
    addTodo(state, { payload }) {
      todosAdapter.addOne(state, {
        title: payload.title,
        id: nanoid(),
        completed: false,
      });
    },
    toggleTodo(state, { payload }) {
      todosAdapter.updateOne(state, {
        id: payload.id,
        changes: { completed: !state.entities[payload.id].completed },
      });
    },
  },
});

export const { addTodo, toggleTodo, initializeTodos } = todosSlice.actions;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => state.todos);

export default todosSlice.reducer;
