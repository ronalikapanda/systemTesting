import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { checkLoginDetail } from "../store/slice/profileSlice";
interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

function PrivateRoute() {
  const dispatch = useAppDispatch();
  const login_data = useAppSelector((state) => state.profile);
  let navigate = useNavigate();
  const { userStatus } = login_data;
  let isAuthenticated = false;
//   let token = localStorage.getItem("admin_auth_token");
  let userDetails = localStorage.getItem("userProfile");
  if (userDetails) {
    isAuthenticated = true;
  }
  useEffect(() => {
    dispatch(checkLoginDetail(""));
  }, []);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;