import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { tokenService } from "services/auth/tokenService";
import { authService } from "services/auth/authService";

// Type for our state
export interface IInitialState {
  id:string,
  name:string,
  email:string,
  created_at:string,
  image: string,
  admin: any
}

// Initial state
const initialState: IInitialState = {
  id: "",
  name: "",
  email: "",
  created_at: "",
  image: "",
  admin: false
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUserData(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.created_at = action.payload.created_at;
      state.image = action.payload.image;
      state.admin = action.payload.admin
    },

    cleanUserData(state) {
      state.id= "";
      state.name= "";
      state.email= "";
      state.created_at= "";
      state.image= "";
      state.admin = false;
    },
  },
});

export const { setUserData, cleanUserData } = userSlice.actions

async function verifySession(token:any) {
  const session = await authService.session(token);

  return await session;
}

const token = tokenService.get(null);
const session = await verifySession(token);

console.log("SESSION: ", session)

// Selector
export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer