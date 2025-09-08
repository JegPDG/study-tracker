import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Your Django API URL import.meta.env.VITE_API_BASE_URL
});

console.log(import.meta.env.VITE_API_BASE_URL)

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Always extract only the path
    const urlPath = new URL(config.url, api.defaults.baseURL).pathname;

    const publicPaths = ['/auth/login/', '/auth/register/', ];
    console.log(publicPaths)

    // Attach token ONLY if URL is NOT public
// !publicPaths.some(path => urlPath.endsWith(path))
    // !publicPaths.includes(urlPath)
    if (!publicPaths.some(path => urlPath.endsWith(path)) && token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('this ran')
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Add this response interceptor below
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/`,
          { refresh: refreshToken }
        );
        localStorage.setItem('token', res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure (e.g., logout)
      }
    }
    return Promise.reject(error);
  }
);

export default api;
