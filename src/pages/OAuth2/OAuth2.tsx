import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const OAuth2 = () => {
  const [searchParams] = useSearchParams();

  const { signInWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      signInWithToken(token);
    }
  }, [signInWithToken]);

  return null;
};

export default OAuth2;
