import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientSessions, fetchTherapistSessions } from '../features/sessionSlice';
import { fetchTherapists } from '../features/therapistsSlice';
import SessionsList from '../components/SessionList';
import TherapistSessionsList from '../components/TherapistSessionsList';
import { useNavigate } from 'react-router-dom';
import { handleStripeCheckout } from '../utils/paymentgateway'; // Import the Stripe module

const ScheduleSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const therapists = useSelector((state) => state.therapists.therapists);
  const [therapistId, setTherapistId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [sharedNotes, setSharedNotes] = useState('');
  const [amount] = useState(499);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    dispatch(fetchTherapists());
    dispatch(fetchTherapistSessions());
    dispatch(fetchClientSessions());
  }, [dispatch, navigate, user]);

  const handleSubmit = async () => {
    const data = {
      amount: amount,
      user: user,
      appointmentDate: appointmentDate,
      therapistId: therapistId,
      sharedNotes: sharedNotes,
    };

    // Use the extracted Stripe functionality
    await handleStripeCheckout(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 p-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Schedule a Session</h1>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Select Therapist</label>
            <select
              value={therapistId}
              onChange={(e) => setTherapistId(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a Therapist</option>
              {therapists.map((therapist) => (
                <option key={therapist._id} value={therapist._id}>
                  {therapist.name} - {therapist.email}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Session Date & Time</label>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Shared Notes</label>
            <textarea
              value={sharedNotes}
              onChange={(e) => setSharedNotes(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows="5"
              placeholder="Add any details you wish to share with the therapist..."
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition"
          >
            Pay
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {user?.role === 'Client' ? <SessionsList /> : <TherapistSessionsList />}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSession;
