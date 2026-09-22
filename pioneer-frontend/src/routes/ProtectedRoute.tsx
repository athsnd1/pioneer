import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

    const { user, loading, checkAuth } = useAuth();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if(loading) {
      return (
        <Loading />
      )
    }

    if(!user) {
        return(
          <Navigate to="/login" replace/>
        )
    }

  return (
    <div>
        { children }
    </div>
  )
}
