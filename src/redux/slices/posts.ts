import {
  createSlice,
  createAsyncThunk,
  type AsyncThunk,
  type AsyncThunkConfig,
  type Reducer,
} from "@reduxjs/toolkit";
import axios from "../../axios";
import type { PostType } from "../../types";

type Status = "loading" | "loaded" | "error";

type InitialState = {
  posts: Array<PostType>;
  lastTags: Array<string>;
  status: Status;
};

const initialState: InitialState = {
  posts: [],
  lastTags: [],
  status: "loading",
};

export const fetchPosts: AsyncThunk<
  Array<PostType>,
  void,
  AsyncThunkConfig
> = createAsyncThunk<Array<PostType>, void>("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;

        state.lastTags = [
          ...new Set(action.payload.slice(0, 10).flatMap((post) => post.tags)),
        ].slice(0, 10);

        state.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts = [];
        state.lastTags = [];
        state.status = "error";
      });
  },
});

export const postsReducer: Reducer<InitialState> = postsSlice.reducer;
