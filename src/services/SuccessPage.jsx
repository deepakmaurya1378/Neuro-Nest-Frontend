import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSession } from '../features/sessionSlice';

const SuccessPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);  // Assuming user is in Redux state
  const location = useLocation();  // To access query params
  const [flag, setFlag] = useState(false);
  console.log(user.id)
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: '',
    therapistId: '',
    sharedNotes: '',
    clientId:'',
  });
  
  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const appointmentDate = queryParams.get('appointmentData');
  const therapistId = queryParams.get('therapistId');
    const sharedNotes = queryParams.get('sharedNotes');
    
    console.log(appointmentDate);
    (sharedNotes)
  if (appointmentDate && therapistId) {
    setAppointmentData({
      appointmentDate: decodeURIComponent(appointmentDate),
      therapistId: decodeURIComponent(therapistId),
      sharedNotes: decodeURIComponent(sharedNotes),
      clientId: user?.id || '',
    });
    }
  }, [location.search, dispatch, user.id]);
  console.log(appointmentData.appointmentDate)

  // Handler for the "Schedule Confirm" button
  const createSessionHandler = () => {
    try {
      dispatch(createSession(appointmentData)).unwrap();
      setFlag(true);
    }
    catch(error) {
      console.log("Error" ,error)
    } // Set flag to show the confirmation message
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-green-600">Payment Successful!</h1>
        
        {flag === false ? (
          <div>
            
            <p className="mt-4 text-lg mb-4">Client: {user ? user.name : 'Guest'}</p>
            <p className="mt-4 text-lg mb-4">Appointment Date: {appointmentData.appointmentDate}</p>
            <p className="mt-4 text-lg mb-4">Your session almost have been completed please Confirm.</p>
            <button
              type="button"
              onClick={createSessionHandler} // Corrected event handler
              className="mt-6 py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Schedule Confirm
            </button>
          </div>
        ) : (
          <div>
            <p className="mt-4 text-lg mb-4">Your session has been scheduled successfully.</p>
            <Link
              className="mt-6 py-2 px-4 bg-blue-600 text-white rounded-md"
              to="/sessions"
            >
              Go back
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
