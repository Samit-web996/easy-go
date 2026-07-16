import axios from 'axios';

// Vite ke liye import.meta.env use hoga bhai
const baseURL = import.meta.env.VITE_API_URL || 'https://easygo-backend-h5xl.onrender.com';

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true 
});

export default API;