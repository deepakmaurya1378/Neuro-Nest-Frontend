import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/authSlice";

import Footer from "./components/Footer"
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmotionPage from './pages/EmotionJournal';
import SessionPage from './pages/ScheduleSession';
import MessagePage from './pages/MessageCenter';
import TherapistList from './pages/TherapistList';
import Navbar from './components/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';
import EmotionDetail from './components/EmotionDetail';
import ChatPage from "./components/ChatPage"
import EmotionListForTherapist from './components/EmotionListForTherapist';
import UserManual from './pages/UserManual';
import SuccessPage from './services/SuccessPage';
import FailurePage from './services/FailurePage';
import EmotionalDetailForTherapist from './components/EmotionalDetailForTherapist';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/success" element={<ProtectedRoute> <SuccessPage /> </ProtectedRoute>} />
            <Route path="/failure" element={<ProtectedRoute> <FailurePage /> </ProtectedRoute>} />
            <Route path="/therapist" element={ <ProtectedRoute> <TherapistList /> </ProtectedRoute>}/>
            <Route path="/emotion/:emotionId" element={ <ProtectedRoute> <EmotionDetail/> </ProtectedRoute>}/>
            <Route path="/ClientNotes/:sessionId" element={ <ProtectedRoute> <EmotionalDetailForTherapist/> </ProtectedRoute>} />
            <Route path="/ChatSessions/:receiverId" element={ <ProtectedRoute> <ChatPage/> </ProtectedRoute>}/>
            <Route path="/UserManual" element={ <ProtectedRoute> <UserManual/> </ProtectedRoute>} />
            <Route path="/emotions"   element={ <ProtectedRoute> <EmotionPage /> </ProtectedRoute>}/>
            <Route path="/emotionsofClient"   element={ <ProtectedRoute> <EmotionListForTherapist/> </ProtectedRoute>}/>
            <Route path="/sessions"element={<ProtectedRoute> <SessionPage /> </ProtectedRoute>}/>
            <Route path="/messages"element={<ProtectedRoute><MessagePage /></ProtectedRoute>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
