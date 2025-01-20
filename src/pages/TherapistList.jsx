import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTherapists } from '../features/therapistsSlice';
import { useNavigate } from 'react-router-dom';
import { handleStripeCheckout } from '../utils/paymentgateway';

const TherapistList = () => {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector((state) => state.therapists);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTherapistId, setSelectedTherapistId] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user)

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    dispatch(fetchTherapists());
  }, [dispatch, navigate, user]);

  const filteredTherapists = therapists.filter((therapist) =>
    therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    therapist.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectTherapist = (therapistId) => {
    setSelectedTherapistId(therapistId);
    setBookingModalOpen(true);
  };

  const handleBooking = () => {
    const Data = {
      user: user, 
      therapistId: selectedTherapistId,
      appointmentDate: appointmentTime,
      amount: 499,
      sharedNotes : ""
    };
    handleStripeCheckout(Data);
  };

  if (loading) return <p className='text-center align-middle h-screen'>Loading therapists...</p>;
  if (error) return <p className='text-center  align-middle h-screen '>Error loading therapist : session expire! Please login.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="font-bold text-2xl p-4 text-center">Therapists</h1>
      <input
        type="text"
        placeholder="Search therapists..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded-md w-full mb-6"
      />

      <ul>
        {filteredTherapists.map((therapist) => (
          <li key={therapist._id} className="bg-white p-4 mb-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{therapist.name}</h2>
            <p>{therapist.email}</p>
            <button
              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => handleSelectTherapist(therapist._id)}
            >
              Select Therapist
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h3 className="text-lg">Select Appointment Time</h3>
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-2 border mt-2 rounded"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleBooking}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setBookingModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TherapistList;
