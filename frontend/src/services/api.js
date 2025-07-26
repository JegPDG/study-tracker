import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Django API URL
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (
      config.url.includes('/auth/login') || 
      config.url.includes('/auth/register/')
    ) {
      return config;
    }

    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error => Promise.reject(error))
);




export default api;
