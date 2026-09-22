import { createContext } from "react";
import type { User } from "../types/User";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    login: (user: User) => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);