import {
  createSlice,
  createAsyncThunk,
  type AsyncThunk,
  type AsyncThunkConfig,
} from "@reduxjs/toolkit";
import axios from "../../axios";
import type { PostSchemaType } from "../../types";

export const fetchPosts: AsyncThunk<
  Array<PostSchemaType>,
  void,
  AsyncThunkConfig
> = createAsyncThunk<Array<PostSchemaType>, void>(
  "posts/fetchPosts",
  async () => {
    const { data } = await axios.get("/posts");
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      });
  },
});

export const postsReducer = postsSlice.reducer;
