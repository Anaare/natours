import { useEffect, useState } from "react";

import type { Review } from "../types";
import { useFetchSingleTour } from "./useFetchSingleTour";

export const useFetchReviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tour } = useFetchSingleTour();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!tour?._id) return;

      try {
        setLoading(true);
        setError(null);

        const API_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_URL}/api/v1/tours/${tour._id}/reviews`);

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
  }, [tour?._id]);

  return { reviews, loading, error };
};
