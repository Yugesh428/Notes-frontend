"use client";

import { Provider } from "react-redux";
import { store } from "../store/slice/index"; // Imports the store we just created
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* Replace with your actual Client ID from .env */}
      <GoogleOAuthProvider clientId="157751562890-tfb0huabqjsl0eq8tf9u8vohidvqei4p.apps.googleusercontent.com">
        <Toaster position="top-right" />
        {children}
      </GoogleOAuthProvider>
    </Provider>
  );
}
