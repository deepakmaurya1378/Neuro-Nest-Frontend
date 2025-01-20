import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import journalReducer from '../features/emotionSlice';
import sessionReducer from '../features/sessionSlice';
import messageReducer from '../features/messageSlice';
import therapistReducer from "../features/therapistsSlice"; 
  
export const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
    sessions: sessionReducer,
    messages: messageReducer,
    therapists: therapistReducer,
    
  },
});

export default store;
