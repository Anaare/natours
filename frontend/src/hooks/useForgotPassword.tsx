import { useState } from "react";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendUpdatePasswordLink = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const emailObject = { email: email };
      const res = await fetch(`${API_URL}/api/v1/users/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(emailObject),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const message =
          errorData.message || `Request failed with status: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendUpdatePasswordLink };
};
