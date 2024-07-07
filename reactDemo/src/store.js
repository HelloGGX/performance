// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/reRender/oldTodoSlice.js';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
