import { useState } from "react";
import type { UserApiResponse, User } from "../types/index";
import { useAuth } from "./useAuth";

interface UpdatePayload {
  name?: string;
  email?: string;
}

export const useUpdateUser = () => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateUserContext } = useAuth();

  const updateUser = async (payload: FormData | UpdatePayload) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const isFormData = payload instanceof FormData;

      let headers: HeadersInit = {};
      let body: BodyInit;

      if (isFormData) {
        body = payload;
      } else {
        headers = { "Content-Type": "application/json" };
        body = JSON.stringify(payload);
      }

      const res = await fetch(`${API_URL}/api/v1/users/updateMe`, {
        method: "PATCH",
        headers: headers,
        credentials: "include",
        body: body,
      });

      if (!res.ok) {
        throw new Error(`Update failed (${res.status})`);
      }

      const data: UserApiResponse = await res.json();
      const userAfterUpdate = data.data.user;

      console.log(userAfterUpdate);

      updateUserContext(userAfterUpdate);
      setUpdatedUser(userAfterUpdate);
      return userAfterUpdate;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, updatedUser, loading, error };
};
