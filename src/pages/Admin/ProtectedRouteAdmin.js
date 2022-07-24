import React, {useEffect} from "react";
import { Navigate, Outlet, NavLink } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./styles.css";

function ProtectedRouteAdmin() {
  const { user } = useAuth();

  useEffect(() => {
  }, []);


  if (user.role !== "admin") {
    // user is not admin
    return <Navigate to="/" />;
  }
  const active = {
    backgroundColor: "#ced1cc",
  };
  const tableBorder={
    border:"10px solid #ced1cc",
  }
  return (
    <>
      <nav>
        <ul className="admin-menu">
          <li>
            <NavLink 
              to="/admin/"
              style={({ isActive }) => (isActive ? active : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              style={({ isActive }) => (isActive ? active : undefined)}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              style={({ isActive }) => (isActive ? active : undefined)}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
      <div style={tableBorder}>
        <Outlet />
      </div>
    </>
  );
}

export default ProtectedRouteAdmin;
