import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage } from '../features/messageSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { receiverId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.messages.messages);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages when a receiver is selected
  useEffect(() => {
    if (receiverId) {
      dispatch(fetchMessages({ senderId: user.id, receiverId }));
    }
  }, [receiverId, dispatch, user , messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    dispatch(
      sendMessage({
        senderId: user.id,
        receiverId,
        message: newMessage,
      })
    );
    setNewMessage('');
  };

  return (
    <div className="flex min-h-screen">
      {/* Chat Area */}
      <div className="flex-1 bg-white p-4">
        {receiverId ? (
          <>
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Chat Session with {user.role === 'Client' ? 'Therapist' : 'Client'}
            </h3>
            <div className="flex-1 overflow-y-auto mb-6 p-4 bg-gray-50 rounded-md">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 mb-2 rounded-md ${
                      msg.senderId === user.id
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-gray-700 self-start"
                    }`}
                  >
                    {/* Show message prefix based on sender and role */}
                    {msg.senderId === user.id
                          ? "You : "
                          : user.role === "Therapist"
                          ? "Client : "
                          : "Therapist : "
                      }
                    {msg.message}
                  </div>
                ))}
              </div>

            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-md"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
