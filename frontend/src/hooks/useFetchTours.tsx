import { useEffect, useState } from "react";
import type { ApiResponse, Tour } from "../types/index";

export const useFetchTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://natours-x62c.onrender.com/api/v1/tours"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        setTours(data.data.doc);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchTours();
  }, []);

  return { tours, loading, error };
};
