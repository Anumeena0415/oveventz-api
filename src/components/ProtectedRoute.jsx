import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  const token = localStorage.getItem("authToken");
  // Check if user is authenticated
  if (!token || !authUser || !authUser.id) {
    toast.error("Please login to access this page");
    return <Navigate to="/Login" replace />;
  }

  // Check if specific role is required (especially for admin routes)
  if (requiredRole && authUser.role !== requiredRole) {
    toast.error(`Access denied. ${requiredRole} role required.`);
    // Always redirect to login page for unauthorized access to admin routes
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;

