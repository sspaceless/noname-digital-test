import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State, Task } from "./types";

export const initialState: State = {
  todo: [],
  done: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTodo(state, action: PayloadAction<Task[]>) {
      state.todo = action.payload;
    },
    setDone(state, action: PayloadAction<Task[]>) {
      state.done = action.payload;
    },
    pushTodo(state, action: PayloadAction<Task>) {
      state.todo.unshift(action.payload);
    },
    pushDone(state, action: PayloadAction<Task>) {
      state.done.unshift(action.payload);
    },
  },
});

export const tasksActions = tasksSlice.actions;
