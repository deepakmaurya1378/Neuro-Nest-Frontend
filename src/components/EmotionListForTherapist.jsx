import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTherapistSessions } from '../features/sessionSlice'; // Modified fetchSessions function for Therapist
import { Link } from 'react-router-dom';

const TherapistSessionsList = () => {
  const dispatch = useDispatch();
  const { sessions, loading } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchTherapistSessions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Emotion Journal of Clients</h2>
        <div className="max-h-96 overflow-y-auto">
          {sessions.length > 0 ? (
            <ul className="space-y-6">
              {sessions.map((session) => (
                <li
                  key={session._id}
                  className="p-4 border rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-700">
                      <span className="font-bold">Client:</span> {session.clientId?.name || 'Unknown'}
                    </p>
                    {session.sessionNotes?.privateNotes && (
                      <Link to={`/ClientNotes/${session._id}`}>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                          Private Notes
                        </button>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No sessions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistSessionsList;
