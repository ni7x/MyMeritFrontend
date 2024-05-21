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

  if(userContent === undefined){
    userContent = "You have to be company to access this page";
  }

  return isAuthenticated() ? (isAuthenticatedCompany() ? companyContent : userContent) : "You have to be logged in to access this page";
};

export default ProtectedRoute;
