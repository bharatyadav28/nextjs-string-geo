
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { clearAuth, selectAuth } from "../features/authSlice";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { refreshToken } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const checkToken = async () => {
      if (refreshToken && jwtDecode(refreshToken)?.exp < Date.now() / 1000) {

         dispatch(clearAuth());
      //  console.log('clearing');
      //   navigate("/");
      }
    };

    checkToken();
  }, [refreshToken, navigate,dispatch]);

  if (!refreshToken ) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;