import { useSearchParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const OAuth2 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { signInWithToken, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!user && searchParams.has("token")) {
      const token = searchParams.get("token");
      if (token) {
        signInWithToken(token);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated]);

  return <div>OAuth2</div>;
};

export default OAuth2;
