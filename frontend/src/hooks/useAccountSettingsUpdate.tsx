import { useEffect, useState } from "react";
// import type { UserApiResponse, User } from "../types/index";

export const useAccountSettingsUpdater = (
  email: string | undefined,
  password: string | undefined
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newData, setNewData] = useState(null);
  useEffect(() => {
    // setUser(null);
    setError(null);
    setLoading(true);

    const updateUser = async () => {
      try {
        const res = await fetch(
          "https://natours-x62c.onrender.com/api/v1/users/updateMe",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        setNewData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    updateUser();
  }, [email, password, newData]);

  return { loading, error, newData };
};
