import axios from 'axios';

// eslint-disable-next-line no-undef
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://easygo-backend-h5xl.onrender.com';

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true 
});

export default API;

// import axios from 'axios';

// // Direct variable ko access karo, Next.js client par iski value text replace kar dega
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://easygo-backend-h5xl.onrender.com';

// const API = axios.create({
//   baseURL: baseURL,
//   withCredentials: true 
// });

// export default API;