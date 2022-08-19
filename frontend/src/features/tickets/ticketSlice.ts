import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketService } from "./ticketService";

type initialStateType = {
  tickets: Array<any>;
  ticket: {};
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: initialStateType = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
