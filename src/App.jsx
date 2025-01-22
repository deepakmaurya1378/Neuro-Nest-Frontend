import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice";

import Footer from "./components/Footer";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmotionPage from './pages/EmotionJournal';
import SessionPage from './pages/ScheduleSession';
import MessagePage from './pages/MessageCenter';
import TherapistList from './pages/TherapistList';
import Navbar from './components/Navbar';
import EmotionDetail from './components/EmotionDetail';
import ChatPage from "./components/ChatPage";
import EmotionListForTherapist from './components/EmotionListForTherapist';
import UserManual from './pages/UserManual';
import SuccessPage from './services/SuccessPage';
import FailurePage from './services/FailurePage';
import EmotionalDetailForTherapist from './components/EmotionalDetailForTherapist';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/success"
              element={isAuthenticated ? <SuccessPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/failure"
              element={isAuthenticated ? <FailurePage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/therapist"
              element={isAuthenticated ? <TherapistList /> : <Navigate to="/" replace />}
            />
            <Route
              path="/emotion/:emotionId"
              element={isAuthenticated ? <EmotionDetail /> : <Navigate to="/" replace />}
            />
            <Route
              path="/ClientNotes/:sessionId"
              element={isAuthenticated ? <EmotionalDetailForTherapist /> : <Navigate to="/" replace />}
            />
            <Route
              path="/ChatSessions/:receiverId"
              element={isAuthenticated ? <ChatPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/UserManual"
              element={isAuthenticated ? <UserManual /> : <Navigate to="/" replace />}
            />
            <Route
              path="/emotions"
              element={isAuthenticated ? <EmotionPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/emotionsofClient"
              element={isAuthenticated ? <EmotionListForTherapist /> : <Navigate to="/" replace />}
            />
            <Route
              path="/sessions"
              element={isAuthenticated ? <SessionPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/messages"
              element={isAuthenticated ? <MessagePage /> : <Navigate to="/" replace />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
