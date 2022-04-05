import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAdmin = () => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  return user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
