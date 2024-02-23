import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

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
