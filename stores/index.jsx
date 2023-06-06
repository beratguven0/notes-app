import { configureStore } from "@reduxjs/toolkit";
import { reducer as notesReducer } from "./notes-store";

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      notes: notesReducer,
    },
    preloadedState,
  });

  return store;
}
