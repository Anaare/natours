// src/hooks/useAuth.ts (or src/context/useAuth.ts, your choice)

import { useContext } from "react";
// Import the context object from its file
import { AuthContext } from "../context/AuthContext";
import type { AuthContextType } from "../context/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
