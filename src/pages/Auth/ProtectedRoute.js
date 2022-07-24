import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
