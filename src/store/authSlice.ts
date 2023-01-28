import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface IInitialState {
  authState: boolean;
}

// Initial state
const initialState: IInitialState = {
  authState: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

  },
});

export const { setAuthState} = authSlice.actions

// Selector
export const selectAuthState = (state: RootState) => state.auth.authState;

export default authSlice.reducer