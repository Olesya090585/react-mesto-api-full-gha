import * as React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({
  isLoggedIn,
  element: Component,
  ...props
}) => {
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};
export default ProtectedRouteElement;
