import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface IInitialState {
  loading: boolean;
}

// Initial state
const initialState: IInitialState = {
  loading: false,
};

// Actual Slice
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {

    // Action to set the authentication status
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state: AppState) => state.loading.loading;

export default loadingSlice.reducer;