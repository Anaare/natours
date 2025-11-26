import { useEffect } from "react";
import { useAuth } from "./useAuth";
import axiosInstance from "../api/axiosInstance";

/**
 * Hook to initialize auth state on app load.
 * Fetches the current user from a protected endpoint to restore login state
 * if the JWT cookie is still valid.
 */
export const useAuthInit = () => {
  const { login, logout } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Call a protected endpoint (e.g., GET /users/me)
        // to verify the JWT cookie is valid and fetch current user data
        const res = await axiosInstance.get("/users/me");

        if (res.data.status === "success" && res.data.data.user) {
          const { name, email, photo } = res.data.data.user;
          login({ name, email, photo });
        }
      } catch (error) {
        // If the request fails (cookie expired or invalid), ensure user is logged out
        console.error(error);
        logout();
      }
    };

    initializeAuth();
  }, [login, logout]);
};
