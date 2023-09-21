import { Navigate, Outlet } from "react-router-dom";
import { isPermissionPresent } from "../utils/generalUltility";
import React from "react";

export default function AccessControl({
  routePath,
  isAuthenticatedRoute,
  routePermission,
}) {
  if (!isAuthenticatedRoute || isAuthenticatedRoute) {
    // if (
    //   ["/login", "/forgot-password", "/set-password"].includes(routePath) &&
    //   User.isTokenAvailable()
    // )
    //   return <Navigate to="/" replace />;
    // Check permission
    const hasPermission = isPermissionPresent(routePermission);

    if (hasPermission) {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    return <Navigate to="/" replace />;
  }
}
