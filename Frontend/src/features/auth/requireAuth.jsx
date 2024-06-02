import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ allowedRole }) {
  const { role } = useSelector(state=>state.auth);
  const location = useLocation();
  const isallowed = allowedRole?.includes(role);
  const content = isallowed ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/auth" state={{ from: location }} replace />
  );

  return content;
}
