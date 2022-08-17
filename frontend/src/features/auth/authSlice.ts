import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { UserType, RegisterType } from "../../type";

type LoginType = Pick<UserType, "email" | "password">;

type UserLocalStorage = {
  token: string;
  _id: string;
} & LoginType;

type StateType = {
  user: UserLocalStorage | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const localStorageItem = localStorage.getItem("user");
const user: UserLocalStorage = localStorageItem && JSON.parse(localStorageItem);

const initialState: StateType = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk<
  StateType,
  RegisterType,
  {
    rejectValue: string;
  }
>("auth/register", async (user, thunkApi) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    // console.log("error", error);
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // console.log(message);

    return thunkApi.rejectWithValue(message);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginType, thunkApi) => {
    console.log("user", user);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) {
          state.message = action.payload;
        }
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
