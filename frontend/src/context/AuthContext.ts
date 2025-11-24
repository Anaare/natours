// src/context/AuthContext.ts

import { createContext } from "react";

// 1. Define the TypeScript shape of the context data
export interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (userData: { name: string; email: string; photo: string }) => void;
  logout: () => void;
}

// 2. Create the context object with a default value
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
} as AuthContextType);
