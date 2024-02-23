import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  return isAuthenticated() ? children : null;
};

export default ProtectedRoute;
