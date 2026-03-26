import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

// 1. Create the store factory
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Necessary for handling File uploads in the future
        serializableCheck: false,
      }),
  });
};

// 2. Infer the types from the store factory
export type AppStore = ReturnType<typeof makeStore>;
// FIXED TYPO HERE: changed "getState text" to "getState"
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
