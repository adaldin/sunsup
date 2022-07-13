// React
import { Navigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/authContext";

function ProtectedRoute({ children }) {
  //******CONTEXT*/
  const { user, loading } = useAuth();

  //******LOGIC*/
  if (loading) return <p>Loading</p>;
  if (!user) return <Navigate to="/profile/login">ProtectedRoute</Navigate>;
  return <>{children}</>;
}
export default ProtectedRoute;
