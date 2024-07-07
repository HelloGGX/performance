import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    title: `Todo ${index}`,
    completed: false,
  })),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.unshift({
        id: nanoid(),
        title: payload.title,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
