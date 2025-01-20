import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../utils/axiosInstance";

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ senderId, receiverId }) => {
    const response = await axiosInstance.post('/api/messages/getMessages', {
      senderId,
      receiverId,
    }, {
      withCredentials:true,
    });
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ senderId, receiverId, message }) => {
    const response = await axiosInstance.post('/api/messages/sendMessage', {
      senderId,
      receiverId,
      message,
    }, {
      withCredentials:true,
    });
    return response.data;
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'idle';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload); // Add the new message to the state
      });
  },
});

export default messageSlice.reducer;
