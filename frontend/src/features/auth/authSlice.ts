import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../type";

type RegisterType = Pick<UserType, "name" | "email" | "password">;
type LoginType = Pick<UserType, "email" | "password">;

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: RegisterType, thunkAPI) => {
    console.log("user", user);
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginType, thunkAPI) => {
    console.log("user", user);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const authReducer = authSlice.reducer;
