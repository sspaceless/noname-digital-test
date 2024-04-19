import { configureStore } from "@reduxjs/toolkit";

import { tasksSlice } from "./tasks/slice";
import { State } from "./tasks/types";

const reducer = {
  tasks: tasksSlice.reducer,
};

const storedData = localStorage.getItem("reduxState");
const serializedData = storedData ? JSON.parse(storedData) : {};

const store = configureStore({
  reducer,
  preloadedState: serializedData as { tasks: State },
  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
