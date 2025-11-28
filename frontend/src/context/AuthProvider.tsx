// src/context/AuthProvider.tsx

import { useState, useCallback, useMemo } from "react";
import type { AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    photo: string;
  } | null>(null);

  const login = useCallback(
    (userData: { name: string; email: string; photo: string }) => {
      setIsLoggedIn(true);
      setUser(userData);
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      // Call the backend logout endpoint to clear the JWT cookie
      await axiosInstance.get("/users/logout");
    } catch (error) {
      console.error("Error calling logout endpoint:", error);
    } finally {
      // Clear local state regardless of API call result
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const contextValue: AuthContextType = useMemo(
    () => ({ isLoggedIn, user, login, logout }),
    [isLoggedIn, user, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
