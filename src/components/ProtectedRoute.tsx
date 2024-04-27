import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ userContent, companyContent }: { userContent?: React.ReactNode, companyContent?: React.ReactNode  }) => {
  const { isAuthenticated, isAuthenticatedCompany } = useAuth();
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  if(companyContent === undefined || companyContent === null){
    companyContent = userContent;
  }

  return isAuthenticated() ? (isAuthenticatedCompany() ? companyContent : userContent) : null;
};

export default ProtectedRoute;
