import React from "react";
import { Navigate, Outlet} from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function ProtectedSettingsRoute() {
  const { user } = useAuth();
  if (user?.role !== "admin") {
    // user is not admin
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedSettingsRoute;
