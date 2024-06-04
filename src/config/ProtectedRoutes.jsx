import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import LoadingScreen from "../Components/LoadingScreen";

export const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user) return <Navigate to="/no-access" />;

  return <>{children}</>;
}