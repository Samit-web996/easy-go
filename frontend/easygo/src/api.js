import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://easygo-backend-h5xl.onrender.com',
  withCredentials: true 
});

export default API;