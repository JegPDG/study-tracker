import React, {createContext, useContext, useState, useEffect} from "react";
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [authRefresh, setRefresh] = useState(localStorage.getItem('refresh'))

  const loginUser = async(username, password) => {
    try {
      const response = await api.post('auth/login/', {username, password});
      const token = response.data.access;
      const refresh = response.data.refresh
      console.log(response.data)
      setAuthToken(token)
      setRefresh(refresh)

      localStorage.setItem('refresh', refresh)
      localStorage.setItem('token', token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return true;

    } catch (error){
      console.error('Login failed:', error);
      return false;
    }
  }

  const signUpUser = async(username, email, password) => {
    try {

      const response = await api.post('auth/register/', {username, email, password},
      );

      console.log("User registered:", response.data)
      return true
    } catch (error) {
       console.error('Sign-up failed:', error.response?.data);
       return false
    }
  }

  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    
  };


   return (
    <AuthContext.Provider value={{ authToken, loginUser, logoutUser, signUpUser}}>
      {children}
    </AuthContext.Provider>
  );
}