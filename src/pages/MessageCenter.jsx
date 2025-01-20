import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const MessageCenter = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [receiverId, setReceiverId] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]); // List of connected clients or therapists

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Fetch list of connected users (clients or therapists) depending on the role
    const fetchConnectedUsers = async () => {
      try {
        const response = await axiosInstance.post(
          `/api/sessions/chatlist/${user.id}`, 
          { withCredentials: true }
        );
        console.log(response.data);

        // Remove duplicate users based on their unique IDs (_id)
        const uniqueUsers = response.data.filter(
          (user, index, self) => index === self.findIndex((u) => u._id === user._id)
        );

        setConnectedUsers(uniqueUsers);
      } catch (error) {
        console.error('Error fetching connected users', error);
      }
    };
    fetchConnectedUsers();
  }, [user, navigate]);

  const startChat = (selectedReceiverId) => {
    setReceiverId(selectedReceiverId);
  };

  return user ? (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          {/* {user.role === 'Client' ? 'Therapist Messages' : 'Client Messages'} */}
          Chat Sessions
        </h1>

        {/* Display Connected Users List */}
        <div className="space-y-6 mb-6">
          {connectedUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => startChat(user._id)}
              className={`p-4 flex justify-between items-center rounded-lg border border-gray-300 cursor-pointer transition-all duration-200 ${
                receiverId === user._id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              } hover:bg-blue-100`}
            >
              <span className="font-semibold text-black ">
                   -{'>'}  {user.name} 
                <p className='text-blue-900  m-1 '>Please note : that chat sessions will only commence at the scheduled appointment date and time.</p>
              </span>
              <Link to={`/ChatSessions/${user._id}`}>
                <button
                  className="px-6 py-2 ml-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Start Chat
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl text-gray-600">
        Please <Link to="/" className="text-blue-600 underline">log in</Link> to access your messages.
      </h2>
    </div>
  );
};

export default MessageCenter;
