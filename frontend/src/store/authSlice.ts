import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { authService } from "services/auth/authService";
import { tokenService } from "services/auth/tokenService";

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

export const { setAuthState } = authSlice.actions

async function verifySession(token:any) {
  const session = await authService.session(token);

  return await session;
}

const token = tokenService.get(null);
const session = await verifySession(token);

// Selector
export const selectAuthState = (state: RootState) => state.auth.authState;

export default authSlice.reducer