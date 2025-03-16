import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import locationReducer from "./locationSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      location : locationReducer
    },
  });
}
