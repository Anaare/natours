import { useState, useMemo, useCallback } from "react";
import type { UserContextType } from "./UserContext";
import { UserContext } from "./UserContext";
import type { User, LoginResponse } from "../types/index"; // Import your types
import { useNavigate } from "react-router";

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      setLoading(true);

      try {
        // 1. Send credentials to your secure LOGIN endpoint
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/v1/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        // Handle non-2xx responses
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Login failed with status: ${response.status}`
          );
        }

        const data: LoginResponse = await response.json();

        const loggedInUser: User = data.data.user as User;

        setUser(loggedInUser);

        localStorage.setItem("token", data.token as string);

        navigate("/");
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown login error occurred";
        setError(errorMessage);
        setUser(null);
        // Re-throw the error so the calling component (Login form) can also handle it
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  const isLoggedIn = !!user;

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      isLoggedIn,
      login,
      logout,
    }),
    [user, loading, error, login, logout, isLoggedIn]
  );

  return (
    <UserContext value={contextValue as UserContextType}>
      {children}
    </UserContext>
  );
};
