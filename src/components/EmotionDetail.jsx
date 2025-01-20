import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

const EmotionDetail = () => {
  const { emotionId } = useParams();
  const user = useSelector((state) => state.auth.user); // Get logged-in user info
  const emotions = useSelector((state) => state.journal.emotions); // Get emotions from Redux
  const sessionNotes = useSelector((state) => state.sessions.sessionNotes); // Get session notes from Redux
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let data;
    if (user.role === 'Client') {
      // Client: Get data from the emotional journal
      data = emotions.find((entry) => entry._id === emotionId);
    } 
    setDetail(data);
  }, [emotionId, emotions, sessionNotes, user.role]);

  if (!detail) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto h-screen bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Detail View</h1>
      <div className="text-gray-700 font-medium">
        {detail.emotion && (
          <div className="mb-4">
            <strong>Emotion:</strong> {detail.emotion}
          </div>
        )}
        <div className="mb-4">
          <strong>Timestamp:</strong> {moment(detail.createdAt).format('MMMM Do YYYY, h:mm A')}
        </div>
        {detail.intensity && (
          <div className="mb-4">
            <strong>Intensity:</strong> {detail.intensity}
          </div>
        )}
        {detail.notes && (
          <div className="mb-4">
            <strong>Notes:</strong> {detail.notes}
          </div>
        )}
        {detail.triggers && (
          <div className="mb-4">
            <strong>Triggers:</strong> {detail.triggers}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionDetail;
