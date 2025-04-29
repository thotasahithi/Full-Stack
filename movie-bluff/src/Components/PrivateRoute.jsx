
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getAccessToken } from "../Utilities/token.jsx";

const PrivateRoute = ({ element, ...rest }) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
