import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', 
  timeout: 10000, // Optional: set the request timeout(in milliseconds)
  headers: {
    'Content-Type': 'application/json', // Default content type
   
  },
});

export default axiosInstance;
