import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaJournalWhills, FaUserFriends, FaSearch, FaCalendarCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { fetchEmotions } from '../features/emotionSlice';
import { fetchClientSessions, fetchTherapistSessions } from '../features/sessionSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const emotions = useSelector((state) => state.journal.emotions);
  const sessions = useSelector((state) => state.sessions.sessions);
  
  const dispatch = useDispatch();

  const [lastCompletedSessionDetails, setLastCompletedSessionDetails] = useState({
    clientName: '',
    appointmentDate: '',
    TherapistName: '',
  });

  const currentDate = new Date();

  const upcomingSessions = sessions.filter(session => new Date(session.appointmentDate) > currentDate);
  const pastSessions = sessions.filter(session => new Date(session.appointmentDate) < currentDate);

  const lastCompletedSession = pastSessions.length > 0
    ? pastSessions.reduce((latest, current) => new Date(current.appointmentDate) > new Date(latest.appointmentDate) ? current : latest)
    : null;

  useEffect(() => {
    if (lastCompletedSession) {
      setLastCompletedSessionDetails({
        TherapistName: lastCompletedSession.therapistId.name,
        clientName: lastCompletedSession.clientId.name,
        appointmentDate: new Date(lastCompletedSession.appointmentDate).toLocaleString() // Format it as desired
      });
    }
  }, [lastCompletedSession]);

  useEffect(() => {
    if (user) {
      dispatch(fetchEmotions());
      dispatch(fetchClientSessions());
      dispatch(fetchTherapistSessions());
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-gradient-to-b to-gray-200 flex items-center justify-center">
      <div className="bg-white shadow- rounded-lg max-w-6xl w-full">
        <div className="bg-gray-700 text-white text-center py-10 rounded-t-lg">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-blue-300">Neuro Nest</span>, {user?.name || 'Guest'}!
          </h1>
          <p className="text-lg mt-2 p-3">
            {user
              ? 'Embark on your journey toward better mental health today. Book a session and connect with a therapist through a personalized chat. Share your thoughts, express your concerns, and receive tailored suggestions to help you navigate and improve your well-being.'
              : 'Log in to access your personalized dashboard.'}
          </p>
        </div>

        <div className="p-6">
          {user ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {user.role === 'Client' ? (
                  <Link
                    to="/emotions"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center py-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                  >
                    <FaJournalWhills className="text-3xl mr-3" />
                    <span className="text-xl font-semibold">Emotion Journal</span>
                  </Link>
                ) : (
                  <Link
                    to="/emotionsofClient"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center py-8  rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                  >
                    <FaJournalWhills className="text-3xl mr-3" />
                    <span className="text-xl font-semibold">Clients Journal</span>
                  </Link>
                )}
                <Link
                  to="/sessions"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center py-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <FaCalendarCheck className="text-3xl mr-3" />
                  <span className="text-xl font-semibold">Your Sessions</span>
                </Link>
                <Link
                  to="/therapist"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center py-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <FaSearch className="text-3xl mr-3" />
                  <span className="text-xl font-semibold">Find Therapist</span>
                </Link>
                <Link
                  to="/UserManual"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center py-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <FaUserFriends className="text-3xl mr-3" />
                  <span className="text-xl font-semibold">User Manual</span>
                </Link>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Activity Summary</h2>
                {user.role === "Client" ? (
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-semibold text-blue-800">{emotions?.length || 0}</span> journal entries recorded.
                    </p>
                    <p>
                      Number of Sessions to attend: <span className="font-semibold text-blue-800">{upcomingSessions?.length || "No session found"}</span>
                    </p>
                    <p>Last Completed Session: <span className="text-blue-800"> {lastCompletedSessionDetails.TherapistName || 'N/A'}</span></p>
                    <span className="text-blue-800"> Date: {lastCompletedSessionDetails.appointmentDate || 'N/A'}</span>
                    <p>
                      Total sessions booked: <span className="text-yellow-800 ">{sessions?.length || 0}</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 text-gray-700">
                    <p className=''>Upcoming sessions: <span className="text-blue-800">{upcomingSessions?.length || 0}</span></p>
                    <p className=''>Last Completed Session: <span className="text-blue-800"> {lastCompletedSessionDetails.clientName || 'N/A'}</span></p>
                    <span className="text-blue-800"> Date: {lastCompletedSessionDetails.appointmentDate || 'N/A'}</span>
                    <p className=''>Completed sessions: <span className="text-blue-800">{pastSessions?.length || 0}</span></p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-6">
                Please log in to explore Neuro Nest and track your mental health journey.
              </p>
              <Link
                to="/"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
