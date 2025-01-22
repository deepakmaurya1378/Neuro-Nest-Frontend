import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx';
import { useSelector } from 'react-redux';
import UpdatePasswordMenu from './UpdatePasswordmenu.jsx';

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (user === null) {
    return (
      <nav className="bg-gray-700 p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-blue-300 font-bold text-xl hover:text-blue-200">Neuro Nest</div>
          <Link
            to="/"
            className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Login
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-700 p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-blue-300 font-bold text-xl hover:text-blue-200"
        >
          Neuro Nest
        </Link>

        <div className="hidden lg:flex space-x-6">
          <Link
            to="/dashboard"
            className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Dashboard
          </Link>
          {user.role === 'Client' && (
            <Link
              to="/emotions"
              className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
            >
              Emotions
            </Link>
          )}
          {user.role === 'Therapist' && (
            <Link
              to="/emotionsofClient"
              className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
            >
              Client Journal
            </Link>
          )}
          <Link
            to="/sessions"
            className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Sessions
          </Link>
          <Link
            to="/messages"
            className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Messages
          </Link>
          <Link
            to="/therapist"
            className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Therapists
          </Link>
        </div>

        {/* Settings and Logout Buttons */}
        <div className="hidden lg:flex items-center space-x-4 ml-10">
          <UpdatePasswordMenu />
          <LogoutButton />
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none ml-auto"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700`}>
        <div className="flex flex-col items-center space-y-2">
          <UpdatePasswordMenu />
          <LogoutButton />
        </div>
        <div className="flex flex-col space-y-4 py-4">
          <Link
            to="/dashboard"
            className="text-white text-center hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Dashboard
          </Link>
          {user.role === 'Client' && (
            <Link
              to="/emotions"
              className="text-white text-center hover:text-blue-300 px-3 py-2 rounded-md text-lg"
            >
              Emotions
            </Link>
          )}
          {user.role === 'Therapist' && (
            <Link
              to="/emotionsofClient"
              className="text-white text-center hover:text-blue-300 px-3 py-2 rounded-md text-lg"
            >
              Client Journal
            </Link>
          )}
          <Link
            to="/sessions"
            className="text-white text-center hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Sessions
          </Link>
          <Link
            to="/messages"
            className="text-white text-center hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Messages
          </Link>
          <Link
            to="/therapist"
            className="text-white text-center hover:text-blue-300 px-3 py-2 rounded-md text-lg"
          >
            Therapists
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
