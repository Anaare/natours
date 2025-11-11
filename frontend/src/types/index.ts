// 1. Interface for Coordinates (used in Location types)
export interface Coordinates {
  0: number; // Corresponds to longitude
  1: number; // Corresponds to latitude
}

// 2. Interface for StartLocation and Locations
export interface LocationDetail {
  type: "Point";
  coordinates: Coordinates | [number, number];
  address?: string;
  description: string;
  day?: number;
  _id?: string;
  id?: string;
}

// 3. Interface for Guide objects
export interface Guide {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "lead-guide" | "guide";
}

// 4. The Main Tour Interface
export interface Tour {
  startLocation: LocationDetail;
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: "easy" | "medium" | "difficult";
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
  locations: LocationDetail[];
  guides: Guide[];
  durationWeeks?: number;
  id: string;
  slug: string;
}

// 5. Interface for the API Response Body (the whole object you showed)
export interface ApiResponse {
  status: "success" | string;
  results: number;
  data: {
    doc: Tour[];
  };
}
