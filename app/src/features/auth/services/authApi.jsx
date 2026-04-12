import axios from 'axios';

const isProd = import.meta.env.PROD;

const api = axios.create({
  baseURL: isProd
    ? import.meta.env.VITE_API_URL  // obligatorio en prod
    : (import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"),
});

export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);