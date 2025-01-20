
import { Navigate } from 'react-router-dom'; // Use Navigate to redirect
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated !== null ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
