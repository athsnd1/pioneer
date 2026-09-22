import { AuthContext } from "../contexts/AuthContext";
import { useState, useCallback } from "react";
import type { User } from "../types/User";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {

    const [user, setUser] = useState<User | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);


    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;
    
    function login (user: User) {
        setUser(user);
    }

    async function logout () {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
        setUser(null);
    }

    const checkAuth = useCallback(async () => {

        try {

            const response = await axios.get(baseUrl + "/auth/me", { withCredentials: true });

            if (!response) {
                throw new Error("Failed to authenticate user");
            }

            setUser({ id: response.data?.id, email: response.data?.email })

            setLoading(false);
            
        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }

            setUser(null);
            
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

  return (
    <AuthContext.Provider value={{user, loading, checkAuth, login, logout}}>
        { children }
    </AuthContext.Provider>
  )
}
