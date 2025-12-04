import { useEffect, useState } from "react";
import type { UserApiResponse, User } from "../types/index";

export const useFetchUser = (email: string, password: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(null);
    setError(null);
    setLoading(true);

    if (!email || !password) return;
    const fetchUser = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/v1/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: UserApiResponse = await res.json();

        setUser(data.data.user);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email, password]);

  return { user, loading, error };
};
