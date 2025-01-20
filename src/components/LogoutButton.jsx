import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Import an icon from react-icons

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Dispatch logout action to Redux state
    dispatch(logout());
    // Navigate to the home page
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2   text-white font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      title="Log out from your account"
    >
      <FaSignOutAlt size={18} /> {/* Add an icon for better aesthetics */}
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;
