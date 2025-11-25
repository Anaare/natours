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

// 6. Interface for reviews
export interface Reviews {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  tour: string;
  user: string[];
  id: string;
}

// 7. User Login response
export interface LoginResponse {
  status: string;
  token?: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      photo: string;
    };
  };
}

// 8. Guides Card props
export interface GuideInfo {
  src?: string;
  role: string;
  name: string;
  photo?: string;
  _id?: string;
}

// 9. Reviews

export interface UserDetails {
  _id?: string;
  name: string;
  photo: string;
}

export interface Review {
  _id?: string;
  id: string;
  rating: number;
  review: string;
  tour: string;
  createdAt?: string;
  user: UserDetails;
}
