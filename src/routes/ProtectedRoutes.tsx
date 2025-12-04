// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useMe } from "@/features/auth/useMe";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isPending, isError } = useMe();
console.log(user)
if (isError || !user) {
    return <Navigate to="/login" replace />;
  }
  // Show a loading placeholder while we confirm auth
  if (isLoading || isPending) return <div>Checking authentication...</div>;

  // If query errored (likely 401) or user is null -> redirect to login
  

  // Authenticated
  return <>{children}</>;
}
