import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface IInitialState {
  authState: boolean;
  name: string;
  email: string;
  id: string;
  image: string;
}

// Initial state
const initialState: IInitialState = {
  authState: false,
  name: "",
  email: "",
  id: "",
  image: "",
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

    setUserInfo(state, action) {
      console.log("Action: ", action.payload.name);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.image = action.payload.image
    },
  },
});

export const { setAuthState, setUserInfo } = authSlice.actions

// Selector
export const selectAuthState = (state: RootState) => state.auth.authState;
export const selectUserInfo = (state: RootState) => state.auth;

export default authSlice.reducer