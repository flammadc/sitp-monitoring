import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredRole = ({ isAdmin }) => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredRole;
