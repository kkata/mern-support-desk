import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { UserType, RegisterType } from "../../type";

type LoginType = Pick<UserType, "email" | "password">;

type UserLocalStorage = {
  token: string;
  _id: string;
} & RegisterType;

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
  UserLocalStorage, // payloadCreator の返り値の型
  RegisterType, // payloadCreator の第1引数(arg)の型
  {
    rejectValue: string; // payloadCreator の第2引数(thunkApi)のための型
  }
>("auth/register", async (user, thunkApi) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginType, thunkApi) => {
    console.log("user", user);
  }
);

export const logout = createAction("auth/logout", () => {
  authService.logout();
  return { payload: {} };
});

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
    logout: (state) => {
      state.user = null;
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
        state.user = action.payload;
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
