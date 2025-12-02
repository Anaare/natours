import { useContext } from "react";

import type { UserContextType } from "../context/UserContext";
import { UserContext } from "../context/UserContext";

export const useAuth = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
