import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const guest = localStorage.getItem("guest");

  if (!token && !guest) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
