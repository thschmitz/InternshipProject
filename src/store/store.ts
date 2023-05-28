import {combineReducers, configureStore} from "@reduxjs/toolkit"
import loadingReducer from "./loadingSlice"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import expireReducer from "redux-persist-expire"

const reducers = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  user: userReducer,
})

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "auth"],
  transforms: [
    expireReducer("user", {
      expireSeconds: 7200,
      expiredState: {},
      autoExpire: true
    }),
    expireReducer("auth", {
      expireSeconds: 7200,
      expiredState: {},
      autoExpire: true
    })
  ]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;