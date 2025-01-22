import { useSelector, useDispatch } from 'react-redux';
import { deleteExistingEmotion, fetchEmotions} from '../features/emotionSlice';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { fetchClientSessions } from '../features/sessionSlice';
import axiosInstance from '../utils/axiosInstance';

const EmotionList = () => {
  const emotions = useSelector((state) => state.journal.emotions);
  const sessions = useSelector((state) => state.sessions.sessions);
  const dispatch = useDispatch();

  const [dropdownState, setDropdownState] = useState({});
  const [selectedSession, setSelectedSession] = useState({}); // State for selected session per emotion

  // Fetch sessions when the component mounts
  useEffect(() => {
    dispatch(fetchClientSessions());
    dispatch(fetchEmotions());
    
  }, [dispatch]);
  

  // Delete emotion handler
  const handleDeleteEmotion = async (id) => {
    try {
      dispatch(deleteExistingEmotion(id));
      alert('Emotion deleted successfully!');
    } catch (error) {
      console.error('Failed to delete emotion:', error);
      alert('Error deleting emotion!');
    } 
  };

  

  // Share emotion handler
  const handleShareEmotion = async (emotionId, emotion) => {
    const selected = selectedSession[emotionId];
    if (!selected) {
      alert('Please select a session to share the emotion');
      return;
    }

    try {
      await axiosInstance.patch(
        '/api/sessions/update',
        { emotion, sessionId: selected },
        { withCredentials: true }
      );
      alert('Emotion shared with therapist!');
    } catch (error) {
      console.error('Failed to share emotion:', error);
      alert('Error sharing emotion!');
    }
  };

  // Dropdown toggle handler
  const toggleDropdown = (emotionId) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [emotionId]: !prevState[emotionId],
    }));
  };

  // Select session for an emotion
  const handleSessionSelect = (emotionId, sessionId) => {
    setSelectedSession((prevState) => ({
      ...prevState,
      [emotionId]: sessionId,
    }));
    toggleDropdown(emotionId); // Close dropdown after selecting
  };

  return (
    <div className="p-6 shadow-md bg-gray-50 min-h-screen">
      <h1 className='font-bold text-center text-2xl text-blue-600'>Emotion Journal</h1>
      {emotions.length === 0 ? (
        <h1 className="text-gray-500 text-center mx-2 my-2">No entries yet. Start by adding your first emotion!</h1>
      ) : (
          
          <div className="overflow-y-auto  p-4" style={{ maxHeight: '500px' }}>
          <ul className="space-y-6">
            {emotions.map((entry) => (
              <li key={entry._id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg relative">
                <p className="text-xs text-gray-400">{moment(entry.timestamp).format('MMMM D, YYYY h:mm A')}</p>
                <div className="text-blue-600 text-xl font-semibold mt-2">{entry.emotion}</div>
                <div className="text-sm text-gray-600">Intensity: {entry.intensity}</div>

                <div className="mt-3 flex flex-wrap gap-4">
             
              <Link to={`/emotion/${entry._id}`} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 rounded-md text-white transition shadow-md focus:outline-none focus:ring focus:ring-blue-300 bg-blue-500 hover:bg-blue-600">
                  Open
                </button>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteEmotion(entry._id)}
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white transition shadow-md focus:outline-none focus:ring focus:ring-red-300 bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>

              {/* Share Button */}
              <button
                onClick={() => toggleDropdown(entry._id)}
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white transition shadow-md focus:outline-none focus:ring focus:ring-green-300 bg-green-500 hover:bg-green-600"
              >
                Share 
              </button>
            </div>


                {dropdownState[entry._id] && (
                  <div className="absolute left-0 mt-2 bg-white border rounded-md p-3 shadow-lg z-20 w-full max-w-xs">
                    <ul className="space-y-2">
                      {sessions.length > 0 ? (
                        sessions.map((session) => (
                          <li
                            key={session._id}
                            className="cursor-pointer hover:bg-gray-100 py-1 px-2"
                            onClick={() => handleSessionSelect(entry._id, session._id)}
                          >
                            {moment(session.appointmentDate).format('MMMM D, YYYY, h:mm A') || 'Unknown'}
                          </li>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No sessions available</p>
                      )}
                    </ul>
                  </div>
                )}

                {selectedSession[entry._id] && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Selected Session: {sessions.find((s) => s._id === selectedSession[entry._id])?.appointmentDate}
                    </p>

                    <button
                      onClick={() => handleShareEmotion(entry._id, entry)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md mt-2"
                    >
                      Share Emotion
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmotionList;
