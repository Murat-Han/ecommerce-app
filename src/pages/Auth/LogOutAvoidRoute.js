import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function LogOutAvoidRoute() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default LogOutAvoidRoute;
