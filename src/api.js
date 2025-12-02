import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL || 'https://summittrail-backend.onrender.com';
const api = axios.create({ baseURL });

export function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
