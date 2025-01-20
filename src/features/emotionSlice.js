import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../utils/axiosInstance";

export const fetchEmotions = createAsyncThunk(
  'journal/fetchEmotions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/api/journals', {
        withCredentials: true,
      });
      return data.entries;
    } catch (error) {
      console.error('Error in fetchEmotions:', error.message);
      return rejectWithValue(error.response?.data || 'Network error');
    }
  }
);

export const addNewEmotion = createAsyncThunk(
  'journal/addEmotion',
  async (emotionData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        '/api/journals/entries',
        emotionData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error('Error in addNewEmotion:', error.message);
      return rejectWithValue(error.response?.data || 'Network error');
    }
  }
);

export const deleteExistingEmotion = createAsyncThunk(
  'journal/deleteEmotion',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/journals/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      console.error('Error in deleteExistingEmotion:', error.message);
      return rejectWithValue(error.response?.data || 'Network error');
    }
  }
);

// Slice
const emotionSlice = createSlice({
  name: 'journal',
  initialState: {
    emotions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Emotions
      .addCase(fetchEmotions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmotions.fulfilled, (state, action) => {
        state.emotions = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmotions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Emotion
      .addCase(addNewEmotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewEmotion.fulfilled, (state, action) => {
        state.emotions.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewEmotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Emotion
      .addCase(deleteExistingEmotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingEmotion.fulfilled, (state, action) => {
        state.emotions = state.emotions.filter((e) => e._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteExistingEmotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = emotionSlice.actions;
export default emotionSlice.reducer;
