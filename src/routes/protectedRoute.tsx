import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/contexts/token";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

const ProtectedRoute = ({ children, redirectTo }: ProtectedRouteProps) => {
  const { token } = useAuth();
  return !token ? <Navigate to={redirectTo} /> : children;
};

const HasLoggedIn = ({ children, redirectTo }: ProtectedRouteProps) => {
  const { token } = useAuth();
  return token ? <Navigate to={redirectTo} /> : children;
};

export { ProtectedRoute, HasLoggedIn };
