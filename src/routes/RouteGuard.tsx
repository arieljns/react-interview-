import React from "react";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  children: React.ReactNode;
  authority: string[];
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, authority }) => {
  
  
  const userRole = "operator"; 

  
  if (authority.length === 0) {
    return <>{children}</>;
  }

  
  const hasPermission = authority.includes(userRole);

  if (!hasPermission) {
    
    console.warn(`User role "${userRole}" is unauthorized to access this route.`);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

RouteGuard.displayName = "RouteGuard";
