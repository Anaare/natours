import { useEffect, useState } from "react";
import type { ApiResponse, Tour } from "../types/index";

export const useFetchTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* 
  const API_URL = import.meta.env.VITE_API_URL;

  const res = await fetch(`${API_URL}/api/v1/tours/slug/${slug}`, {
    credentials: "include",
  });
  */
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/v1/tours`, {
          credentials: "include",
        });

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
