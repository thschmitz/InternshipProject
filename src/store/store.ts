import {configureStore} from "@reduxjs/toolkit"
import loadingReducer from "./loadingSlice"
import authReducer from "./authSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
      loading: loadingReducer,
      auth: authReducer,
      user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;