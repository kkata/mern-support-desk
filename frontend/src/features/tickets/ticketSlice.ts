import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ticketService } from "./ticketService";

type initialStateType = {
  tickets: Array<any>;
  ticket: {};
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

export type TicketType = {
  product: string;
  description: string;
};

const initialState: initialStateType = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTicket = createAsyncThunk<
  RootState["ticket"], // payloadCreator の返り値の型
  TicketType, // payloadCreator の第1引数(arg)の型
  {
    state: RootState;
    rejectValue: string; // payloadCreator の第2引数(thunkApi)のための型
  }
>("tickets/create", async (ticketData, thunkApi) => {
  try {
    const user = thunkApi.getState().auth.user;
    if (user) {
      return await ticketService.createTicket(ticketData, user.token);
    }
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
