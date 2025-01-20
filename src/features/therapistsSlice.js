import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../utils/axiosInstance";

export const fetchTherapists = createAsyncThunk('therapists/fetchTherapists', async () => {
  const response = await axiosInstance.get('/api/therapists',{withCredentials:true});
  return response.data;
});

const therapistSlice = createSlice({
  name: 'therapists',
  initialState: {
    therapists: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTherapists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTherapists.fulfilled, (state, action) => {
        state.loading = false;
        state.therapists = action.payload;
      })
      .addCase(fetchTherapists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default therapistSlice.reducer;
