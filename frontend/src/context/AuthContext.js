import React, {createContext, useContext, useState} from "react";
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const loginUser = async(username, password) => {
    try {
      const response = await api.post('auth/login/', {username, password});
      const token = response.data.access;
      setAuthToken(token)
      localStorage.setItem('token', token)
      api.default.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } catch (error){
      console.error('Login failed:', error);
      return false;
    }
  }

  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    delete api.default.headers.common['Authorization'];

  };

  useEffect(() => {
    if (authToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
  }, [authToken]);

   return (
    <AuthContext.Provider value={{ authToken, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}