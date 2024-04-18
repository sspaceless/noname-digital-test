import { configureStore } from "@reduxjs/toolkit";

import { tasksSlice } from "./tasks/slice";

const reducer = {
  tasks: tasksSlice.reducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
