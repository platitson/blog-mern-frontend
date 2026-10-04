import {
  createSlice,
  createAsyncThunk,
  type AsyncThunk,
  type AsyncThunkConfig,
  type Reducer,
} from "@reduxjs/toolkit";
import axios from "../../axios";
import type { PostType } from "../../types";

export const fetchPosts: AsyncThunk<
  Array<PostType>,
  void,
  AsyncThunkConfig
> = createAsyncThunk<Array<PostType>, void>("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

type Status = "loading" | "loaded" | "error";

type PostsInitialState = {
  items: Array<PostType>;
  status: Status;
};

type TagsInitialState = {
  items: [];
  status: Status;
};

type InitialState = {
  posts: PostsInitialState;
  tags: TagsInitialState;
};

const initialState: InitialState = {
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
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });
  },
});

export const postsReducer: Reducer<InitialState> = postsSlice.reducer;
