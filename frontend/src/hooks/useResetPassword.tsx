// src/hooks/useResetPassword.ts

import { useState } from "react";
import type { User } from "../types";

// The shape of data we expect back from the server (JWT token, user data)
interface ResetResponse {
  status: string;
  token: string;
  data: { user: User };
}

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  // Function to handle the password reset API call
  const resetPassword = async (
    token: string,
    password: string,
    passwordConfirm: string
  ): Promise<ResetResponse> => {
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      // Your backend is set up for a PATCH request (best practice for updates)
      const res = await fetch(
        `${API_URL}/api/v1/users/resetPassword/${token}`,
        {
          method: "PATCH", // Assuming your route is app.patch(...)
          headers: { "Content-Type": "application/json" },
          // Include password and passwordConfirm in the body
          body: JSON.stringify({ password, passwordConfirm }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // Throw the error message provided by the backend
        const errorMessage =
          data.message || `Request failed with status: ${res.status}`;
        throw new Error(errorMessage);
      }

      return data as ResetResponse;
    } catch (err) {
      console.error(err);
      throw new Error("Could not reset password.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};
