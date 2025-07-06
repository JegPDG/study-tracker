import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Your Django API URL
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error => Promise.reject(error))
);




export default api;
