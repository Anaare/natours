import { useEffect, useState } from "react";

import type { Reviews } from "../types";
import { useFetchSingleTour } from "./useFetchSingleTour";

export const useFetchReviews = () => {
  const [reviews, setReview] = useState<Reviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tour } = useFetchSingleTour();

  useEffect(() => {
    // 3️⃣ Fetch that specific tour by ID
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/tours/${tour?._id}/reviews`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const tourData = json.data.doc || json.data.tour || json.data;
        setReview(tourData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tour?._id]);

  return { reviews, loading, error };
};
