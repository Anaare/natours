import { useEffect, useState } from "react";
import type { ApiResponse, Tour } from "../types";

export const useFetchTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://127.0.0.1:3000/api/v1/tours");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        setTours(data.data.doc);
        console.log(tours);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchTours();
  }, [tours]);

  return { tours, loading, error };
};
