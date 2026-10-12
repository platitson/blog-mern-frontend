import {
  createSlice,
  createAsyncThunk,
  type AsyncThunk,
  type AsyncThunkConfig,
  type Reducer,
} from "@reduxjs/toolkit";
import axios from "../../axios";
import type { LoginSchemaType, UserType } from "../../types";

type Status = "loading" | "loaded" | "error";

type InitialState = {
  data: UserType;
  status: Status;
};

const initialState: InitialState = {
  data: null,
  status: "loading",
};

export const fetchAuth: AsyncThunk<
  UserType,
  LoginSchemaType,
  AsyncThunkConfig
> = createAsyncThunk<UserType, LoginSchemaType>(
  "auth/fetchAuth",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchAuthMe: AsyncThunk<UserType, void, AsyncThunkConfig> =
  createAsyncThunk<UserType, void>("auth/fetchAuthMe", async () => {
    const { data } = await axios.get("/auth/me");
    return data;
  });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const isAuthSelector = (state) => Boolean(state.auth.data);
export const authReducer: Reducer<InitialState> = authSlice.reducer;
export const { logout } = authSlice.actions;
