import { useState } from "react";
import type { UserApiResponse, User } from "../types/index";

interface UpdatePayload {
  name?: string;
  email?: string;
}

export const useUpdateUser = () => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (userId: string, payload: UpdatePayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://natours-x62c.onrender.com/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // IMPORTANT for auth cookies
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error(`Update failed (${res.status})`);
      }

      const data: UserApiResponse = await res.json();

      setUpdatedUser(data.data.user);
      return data.data.user;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, updatedUser, loading, error };
};
