import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTherapistSessions, updateSession, deleteSession } from '../features/sessionSlice'; // Modified fetchSessions function for Therapist
import { Link } from 'react-router-dom';

const TherapistSessionsList = () => {
  const dispatch = useDispatch();
  const { sessions, loading } = useSelector((state) => state.sessions);
  const [editingSession, setEditingSession] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    sharedNotes: '',
    appointmentDate: '',
  });

  useEffect(() => {
    dispatch(fetchTherapistSessions());
  }, [dispatch]);

  console.log(sessions);
  
  const handleUpdate = (session) => {
    const updatedSessionData = {
      sessionId: session._id,
      updatedData: {
        sessionNotes: {
          sharedNotes: updatedData.sharedNotes,
        },
        appointmentDate: updatedData.appointmentDate,
      },
    };
    dispatch(updateSession(updatedSessionData));
    setEditingSession(null);
  };

  const handleDelete = (sessionId) => {
    dispatch(deleteSession(sessionId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Sessions (Therapist View)</h2>
        <div className="max-h-96 overflow-y-auto">
          {sessions.length > 0 ? (
            <ul className="space-y-4">
              {sessions.map((session) => (
                <li
                  key={session._id}
                  className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Client:</span> {session.clientId?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Appointment:</span> {new Date(session.appointmentDate).toLocaleString()}
                  </p>
                  {editingSession === session._id ? (
                    <>
                      <textarea
                        className="w-full p-2 border mt-2 rounded-md"
                        placeholder="Shared Notes"
                        value={updatedData.sharedNotes}
                        onChange={(e) =>
                          setUpdatedData({ ...updatedData, sharedNotes: e.target.value })
                        }
                      ></textarea>
                      <input
                        type="datetime-local"
                        className="w-full p-2 border mt-2 rounded-md"
                        value={updatedData.appointmentDate}
                        onChange={(e) =>
                          setUpdatedData({ ...updatedData, appointmentDate: e.target.value })
                        }
                      />
                      <button
                        onClick={() => handleUpdate(session)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md mt-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSession(null)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md mt-2 ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {session.sessionNotes?.privateNotes && (
                        <p className="text-sm text-gray-500">
                          <span className="font-bold">Private Notes : </span> Open to see
                          <Link className="pl-20" to={`/ClientNotes/${session._id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                              Open
                            </button>
                          </Link>
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        <span className="font-bold">Shared Notes:</span>{' '}
                        {session.sessionNotes?.sharedNotes || 'N/A'}
                      </p>
                      <button
                        onClick={() => {
                          setEditingSession(session._id);
                          setUpdatedData({
                            privateNotes: session.sessionNotes?.privateNotes || '',
                            sharedNotes: session.sessionNotes?.sharedNotes || '',
                            appointmentDate: session.appointmentDate?.slice(0, 16) || '',
                          });
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md mt-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(session._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md mt-2 ml-2"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No sessions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistSessionsList;
