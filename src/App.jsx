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
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path="/success" element={ <SuccessPage /> } />
            <Route path="/failure" element={ <FailurePage /> } />
            <Route path="/therapist" element={ <TherapistList /> }/>
            <Route path="/emotion/:emotionId" element={ <EmotionDetail/> }/>
            <Route path="/ClientNotes/:sessionId" element={  <EmotionalDetailForTherapist/>} />
            <Route path="/ChatSessions/:receiverId" element={<ChatPage/> }/>
            <Route path="/UserManual" element={  <UserManual/> } />
            <Route path="/emotions"   element={ <EmotionPage /> }/>
            <Route path="/emotionsofClient"   element={  <EmotionListForTherapist/> }/>
            <Route path="/sessions"element={ <SessionPage /> }/>
            <Route path="/messages"element={<ProtectedRoute><MessagePage /></ProtectedRoute>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
