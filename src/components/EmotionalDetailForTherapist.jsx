import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function EmotionalDetailForTherapist() {
  const { sessionId } = useParams();
  const { sessions } = useSelector((state) => state.sessions);
  const user = useSelector((state) => state.auth.user);

  const userRole = user?.role || "Unknown";
  const session = sessions?.find((s) => s._id === sessionId);

  // Normalize and merge privateNotes
  const parsedNotes = session?.sessionNotes?.privateNotes
    ? normalizePrivateNotes(session.sessionNotes.privateNotes)
    : [];

  const renderPrivateNotes = () => {
    if (parsedNotes.length > 0) {
      return (
        <div className="space-y-4">
          {parsedNotes.map((note, index) => (
            <div key={note._id || index} className="p-4 bg-gray-50 border rounded">
              <p><strong>Emotion:</strong> {note.emotion}</p>
              <p><strong>Intensity:</strong> {note.intensity}</p>
              <p><strong>Notes:</strong> {note.notes}</p>
              <p>
                <strong>Triggers:</strong>{" "}
                {note.triggers.length > 0 ? note.triggers.join(", ") : "No triggers available"}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {note.timestamp
                  ? new Date(note.timestamp).toLocaleString() === "Invalid Date"
                    ? "Unknown"
                    : new Date(note.timestamp).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return <p>No private notes available or invalid format.</p>;
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Emotional Details</h1>
        {session ? (
          <>
            <p className="mb-2">
              <strong>{userRole === "Client" ? "Therapist" : "Client"}:</strong>{" "}
              {userRole === "Client" ? session.therapistId?.name : session.clientId?.name || "Unknown"}
            </p>
            <p>
              <strong>Appointment Date:</strong>{" "}
              {session.appointmentDate ? new Date(session.appointmentDate).toLocaleString() : "Unknown"}
            </p>

            <p className="mt-4">
              <strong>Private Notes:</strong>
            </p>
            {renderPrivateNotes()}
          </>
        ) : (
          <p className="text-red-500">Session not found. Ensure the session ID is correct.</p>
        )}
      </div>
    </div>
  );
}

// Utility Function
function normalizePrivateNotes(privateNotes) {
  let normalizedNotes = [];

  try {
    const data = typeof privateNotes === "string" ? JSON.parse(privateNotes) : privateNotes;

    if (data) {
      if (Array.isArray(data.entries)) {
        normalizedNotes = data.entries.map((entry) => ({
          emotion: entry.emotion || "Unknown",
          intensity: entry.intensity || 0,
          notes: entry.notes || "No notes",
          triggers: Array.isArray(entry.triggers) ? entry.triggers : [],
          timestamp: entry.timestamp || null,
          _id: entry._id || null,
        }));
      } else if (data.emotion) {
        normalizedNotes = [
          {
            emotion: data.emotion || "Unknown",
            intensity: data.intensity || 0,
            notes: data.notes || "No notes",
            triggers: Array.isArray(data.triggers) ? data.triggers : [],
            timestamp: data.timestamp || null,
            _id: data._id || null,
          },
        ];
      }
    }
  } catch (error) {
    console.error("Error normalizing privateNotes:", error);
  }

  normalizedNotes = normalizedNotes.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB - dateA;
  });

  return normalizedNotes;
}
