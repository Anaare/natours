import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Tour } from "../types";

export const useFetchSingleTour = () => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    // 3️⃣ Fetch that specific tour by ID
    const fetchSingleTour = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:3000/api/v1/tours/${slug}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const tourData = json.data.doc || json.data.tour || json.data;
        setTour(tourData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSingleTour();
  }, [slug]);
  return { tour, loading, error };
};
