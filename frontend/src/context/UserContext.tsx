import { createContext } from "react";
import type { User } from "../types/index";

export interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserContext: (updatedUser: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
