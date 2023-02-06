import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { tokenService } from "services/auth/tokenService";
import { authService } from "services/auth/authService";

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

async function verifySession(token:any) {
  const session = await authService.session(token);
  console.log("SESSION USER SLICE: ", session)


  return await session;
}

const token = tokenService.get(null);
const session = await verifySession(token);


// Selector
export const selectUserData = (state: RootState) => session?.data?.body?.id ? state.user : localStorage.clear();

export default userSlice.reducer