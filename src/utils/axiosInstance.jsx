import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://neuro-nest-api.onrender.com/', 
  timeout: 10000, // Optional: set the request timeout(in milliseconds)
  headers: {
    'Content-Type': 'application/json', // Default content type
   
  },
});

export default axiosInstance;
