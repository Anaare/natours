import { useEffect, useState } from "react";
import type { UsersApiResponse, User } from "../types/index";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://natours-x62c.onrender.com/api/v1/users"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: UsersApiResponse = await res.json();
        setUsers(data.data.doc);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
