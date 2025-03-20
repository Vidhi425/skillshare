import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import locationReducer from "./authSlice"

// Persist config
const persistConfig = {
  key: "root",
  storage, // Uses localStorage for persisting data
};

// Combine reducers (in case you add more later)
const rootReducer = combineReducers({
  auth: authReducer,
  location : locationReducer
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);





