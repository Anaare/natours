import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

import type { Review } from "../types";

export const useFetchUserReviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const API_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_URL}/api/v1/users/my-reviews`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();

        const reviewsArray: Review[] = json.data.doc;

        if (Array.isArray(reviewsArray)) {
          setReviews(reviewsArray);
        } else {
          throw new Error("Invalid review data structure received from API.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setReviews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  return { reviews, loading, error };
};
