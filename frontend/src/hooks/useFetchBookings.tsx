import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

import type { Booking } from "../types";

export const useFetchBookings = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const API_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_URL}/api/v1/users/my-bookings`, {
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
        console.log(json);

        const bookingsArray: Booking[] = json.data.doc;

        if (Array.isArray(bookingsArray)) {
          setBookings(bookingsArray);
        } else {
          throw new Error("Invalid review data structure received from API.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setBookings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  return { bookings, loading, error };
};
