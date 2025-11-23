import { getUserData } from "@/context/userContext";
import Login from "@/pages/Login";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = getUserData();

  if (loading) return null;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
