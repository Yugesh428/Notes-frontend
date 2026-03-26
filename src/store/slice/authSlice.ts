/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Mirror the Backend Types for strict safety
export type UserRole = "student" | "moderator" | "SuperAdmin";

export type EducationLevel =
  | "school"
  | "high_school"
  | "bachelors"
  | "masters"
  | "phd";

export type Faculty =
  | "science"
  | "management"
  | "humanities"
  | "engineering"
  | "medical"
  | "law"
  | "general";

interface UserInfo {
  id: string;
  username: string;
  email?: string;
  role: UserRole;
  level: EducationLevel;
  faculty: Faculty;
  profileImage?: string; // FIXED: Added this to allow profile pictures
}

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed"; // For UI Spinners
}

// Helper to safely get token from localStorage in Next.js (SSR safe)
const getSafeToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const initialState: AuthState = {
  token: getSafeToken(),
  user: null,
  isAuthenticated: !!getSafeToken(),
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Starts the loading state
    setLoading: (state) => {
      state.status = "loading";
    },

    // Handles success from Login/Register/Social Login
    setAuth: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        role: action.payload.user.role,
        level: action.payload.user.level,
        faculty: action.payload.user.faculty,
        profileImage: action.payload.user.profileImage, // FIXED: Map this from backend data
      };
      state.isAuthenticated = true;
      state.status = "succeeded";

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },

    // Handles API failures
    setAuthError: (state) => {
      state.status = "failed";
      state.isAuthenticated = false;
    },

    // Clears all user data
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    // Logic for metadata updates (Level/Faculty change)
    updateUserMetadata: (
      state,
      action: PayloadAction<{ level?: EducationLevel; faculty?: Faculty }>,
    ) => {
      if (state.user) {
        if (action.payload.level) state.user.level = action.payload.level;
        if (action.payload.faculty) state.user.faculty = action.payload.faculty;
      }
    },
  },
});

export const { setAuth, logout, updateUserMetadata, setLoading, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
