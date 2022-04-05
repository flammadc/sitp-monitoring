import React from "react";
import { useSelector } from "react-redux";

const DashboardRole = () => {
  const user = useSelector((state) => state.use.currentUser);
  return user.isAdmin;
};

export default DashboardRole;
