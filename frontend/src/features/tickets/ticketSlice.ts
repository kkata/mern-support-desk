import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ticketService } from "./ticketService";

type initialStateType = {
  tickets: TicketType[] | null;
  ticket: TicketType | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

export type TicketType = {
  createdAt: string;
  description: string;
  product: string;
  status: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

export type CreateTicketType = Pick<TicketType, "description" | "product">;

const initialState: initialStateType = {
  tickets: null,
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTicket = createAsyncThunk<
  TicketType, // payloadCreator の返り値payloadの型
  CreateTicketType, // payloadCreator の第1引数(arg)の型
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

export const getTickets = createAsyncThunk<
  TicketType[], // payloadCreator の返り値payloadの型
  undefined, // payloadCreator の第1引数(arg)の型
  {
    state: RootState;
    rejectValue: string; // payloadCreator の第2引数(thunkApi)のための型
  }
>("tickets/getAll", async (_, thunkApi) => {
  try {
    const user = thunkApi.getState().auth.user;
    if (user) {
      return await ticketService.getTickets(user.token);
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
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
        state.ticket = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
