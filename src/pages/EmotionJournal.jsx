import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  addNewEmotion } from '../features/emotionSlice';
import { logout } from '../features/authSlice';
import EmotionList from '../components/EmotionList';
import {  useNavigate } from 'react-router-dom';

const EmotionJournal = () => {
  const [emotion, setEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [triggers, setTriggers] = useState('');
  const {error} = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [navigate, user]);
  
  const handleAddEmotion = () => {
    if (!emotion.trim()) {
      alert('Please enter an emotion.');
      return;
    }

    if (intensity < 1 || intensity > 10) {
      alert('Intensity must be between 1 and 10.');
      return;
    }

    dispatch(addNewEmotion({ emotion, intensity, notes, triggers }));
    setEmotion('');
    setIntensity(5);
    setNotes('');
    setTriggers('');
  };

  useEffect(() => {
    if (error && error.status === 401) {
      alert('Session expired. Please log in again.');
      dispatch(logout());
      navigate('/');
    }
  }, [error, dispatch, navigate]);

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center min-h-screen bg-gray-100 p-6">
      {/* Left Section
*/}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Add New Emotion</h1>

        <div className="space-y-4">
          <input
            type="text"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Describe your emotion"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            value={intensity}
            min="1"
            max="10"
            onChange={(e) => setIntensity(Number(e.target.value))}
            placeholder="Intensity (1-10)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
          ></textarea>

          <textarea
            value={triggers}
            onChange={(e) => setTriggers(e.target.value)}
            placeholder="What triggered this emotion?"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={handleAddEmotion}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md mt-4 hover:bg-blue-700 transition duration-300"
        >
          Add Emotion
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 bg-white p-6 rounded-lg shadow-md">
        <EmotionList/>
      </div>
    </div>
  );
};

export default EmotionJournal;
