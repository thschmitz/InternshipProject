import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { loadingSlice } from "./loadingSlice";
import { createWrapper } from "next-redux-wrapper";

const reducer = {
  [authSlice.name]: authSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
}

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);