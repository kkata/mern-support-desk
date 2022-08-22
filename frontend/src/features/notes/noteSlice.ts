import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { noteService } from "./noteService";
import { RootState } from "../../app/store";

export type NoteType = {
  _id: string;
  user: string;
  ticket: string;
  text: string;
  isStaff: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type initialStateType = {
  notes: NoteType[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: initialStateType = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getNotes = createAsyncThunk<
  NoteType[], // payloadCreator の返り値payloadの型
  string, // payloadCreator の第1引数(arg)の型
  {
    state: RootState;
    rejectValue: string; // payloadCreator の第2引数(thunkApi)のための型
  }
>("notes/getAll", async (ticketId, thunkApi) => {
  try {
    const user = thunkApi.getState().auth.user;
    if (user) {
      return await noteService.getNotes(ticketId, user.token);
    }
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export const noteReducer = noteSlice.reducer;
