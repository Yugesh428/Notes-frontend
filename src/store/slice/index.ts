import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";

// 1. Configure the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as you build them (e.g., notes: notesReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents errors when sending complex data like Files
    }),
});

// 2. Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 3. Create Custom Hooks (Use these instead of raw useDispatch and useSelector)
// This gives you full autocomplete and type safety in your components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
