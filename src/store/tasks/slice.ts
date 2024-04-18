import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State, Task } from "./types";

export const initialState: State = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
  },
});

export const tasksActions = tasksSlice.actions;
