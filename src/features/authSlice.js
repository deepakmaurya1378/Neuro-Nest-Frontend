import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axiosInstance from "../utils/axiosInstance";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/api/users/check", {
      withCredentials: true, 
    });
    return response.data.user; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to authenticate.");
  }
});

export const handleLogin = createAsyncThunk(
  "auth/login", 
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true } 
      );
      dispatch(login(response.data));
      return response.data; 
    } catch (error) {
      console.error("Error logging in:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/update",
  async ({password, userId, newPassword }, { rejectWithValue }) => {
    try {
      console.log(password);
      
      const response = await axiosInstance.post(
        "/api/users/updatePassword", 
        {password, userId, newPassword },
        { withCredentials: true }
      );
      alert(response.data)
      console.log(response)
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);



export const register = createAsyncThunk( "auth/register",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/register", 
        { name, email, password, role }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
      user: JSON.parse(localStorage.getItem('user')) || null,
      token: localStorage.getItem('token') || null,
      isAuthenticated: (!localStorage.getItem('token'))? false : true,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', state.token);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updatePassword.fulfilled, (state) => {
          state.loading = false;
          state.user = { ...state.user, passwordUpdated: true }; 
        })
        .addCase(updatePassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // Handle the error message
        });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


