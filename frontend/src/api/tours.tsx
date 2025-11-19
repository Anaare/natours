// api/tours.ts
import type { Tour } from "../types";

export const fetchTourDataBySlug = async (slug: string) => {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/tours/slug/${slug}`);

  if (!res.ok) {
    throw new Response(`Tour Not Found for slug: ${slug}`, {
      status: res.status,
    });
  }

  const json = await res.json();

  const tourData: Tour = json.data.doc || json.data.tour || json.data;

  return tourData;
};
