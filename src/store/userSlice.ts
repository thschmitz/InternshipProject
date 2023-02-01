import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface IInitialState {
  id:string,
  name:string,
  email:string,
  created_at:string,
  image: string
}

// Initial state
const initialState: IInitialState = {
  id: "",
  name: "",
  email: "",
  created_at: "",
  image: "",
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUserData(state, action) {
      console.log("PAYLOAD: ", action.payload)
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.created_at = action.payload.created_at;
      state.image = action.payload.image;
    },

    cleanUserData(state) {
      state.id= "";
      state.name= "";
      state.email= "";
      state.created_at= "";
      state.image= "";
    },
  },
});

export const { setUserData, cleanUserData } = userSlice.actions

// Selector
export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer