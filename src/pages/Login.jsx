import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../features/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(handleLogin({ email, password }));
      if (response.payload === "Invalid credentials") {
        alert("Invalid credentials");
      } else {
        setRedirectToDashboard(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.message || 'Error logging in, please try again.');
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h1>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>


          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {"Don't "}have an account?{' '}
            <button
              onClick={() => navigate("/register")} 
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
