import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {

    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth may only be used inside an AuthProvider");
    }

    return context;
}