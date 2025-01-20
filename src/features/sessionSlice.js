import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../utils/axiosInstance";

export const createSession = createAsyncThunk(
  'sessions/create',
  async (appointmentData, { rejectWithValue }) => {
    try { 
      const response = await axiosInstance.post(
        '/api/sessions/create',
         appointmentData,
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      console.log(response.data);
      return response.data; // Assumes backend returns the created session
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'Network error');
    }
  }
);

export const fetchClientSessions = createAsyncThunk(
  'sessions/fetchClientSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/sessions/clientSession', {
        withCredentials: true, // Include credentials in the request
      });
      return response.data; // Assumes backend returns the sessions for the client
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'Network error');
    }
  }
);

export const fetchTherapistSessions = createAsyncThunk(
  'sessions/fetchTherapistSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/sessions/therapistSession', {
        withCredentials: true, // Include credentials in the request
      });
      return response.data; // Assumes backend returns the sessions for the therapist
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'Network error');
    }
  }
);

export const updateSession = createAsyncThunk(
  'sessions/updateSession',
  async ({ sessionId, updatedData }) => {
    const response = await axiosInstance.patch(
      `/api/sessions/${sessionId}`,  // Adjust URL for session update route
      updatedData,  // The data we send for the update (notes, appointment date, etc.)
      { withCredentials: true }  // Make sure credentials are sent if required (sessions, authentication)
    );
    return response.data;  // Return the updated session data
  }
);

export const deleteSession = createAsyncThunk(
  'sessions/deleteSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/sessions/${sessionId}`, { withCredentials: true });
      return sessionId;  // Return the deleted session's ID for removal from the state
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'Network error');
    }
  }
);

const sessionSlice = createSlice({
  name: 'sessions',
  initialState: { sessions: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Session
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
        state.loading = false;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create session';
      })

      // Fetch Client Sessions
      .addCase(fetchClientSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch client sessions';
      })
      
      // Fetch Therapist Sessions
      .addCase(fetchTherapistSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTherapistSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTherapistSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch therapist sessions';
      })
      
      // Update Session
      .addCase(updateSession.fulfilled, (state, action) => {
        const index = state.sessions.findIndex((session) => session._id === action.payload._id);
        console.log("index ======= ", index);
        console.log("action payload ====== ", action.payload);
        console.log("state.sessions[index]", state.sessions[index])
        if (index !== -1) {
          state.sessions[index] = action.payload;
        }
        console.log("state.sessions[index]", state.sessions[index])
      })

      .addCase(deleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((session) => session._id !== action.payload);
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete session'; // Show error message if deletion fails
      });
  },
});

export default sessionSlice.reducer;
