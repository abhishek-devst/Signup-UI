import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getUserRole } from "../utils/auth";

interface Props {
  children: ReactNode;
  role?: string;
}

export default function ProtectedRoute({ children, role }: Props) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role) {
    const userRole = getUserRole();

    if (userRole !== role) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}