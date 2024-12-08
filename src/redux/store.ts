// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./reducer";
export const store = configureStore({
  reducer: {
    news: newsReducer
  }
});

// For easy access to the store's dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
