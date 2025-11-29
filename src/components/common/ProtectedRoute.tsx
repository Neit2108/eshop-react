import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import UnauthorizedPage from "@/pages/common/Unauthorized";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  roles,
  fallback = <Navigate to={"/login"} replace />,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRoles } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (roles && !hasRoles(roles)) {
    console.warn('Access denied. User lacks required roles:', roles);
    setTimeout(() => {
      console.log('Redirecting to unauthorized page...');
      return fallback;
    })
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
}
