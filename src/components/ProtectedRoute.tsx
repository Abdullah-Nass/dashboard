import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Cannot use AuthContext");
  const { isAuthenticated } = context;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}
export default ProtectedRoute;
