import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
