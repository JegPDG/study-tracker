import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../context/AuthContext';

import glasses from '../assets/glasses-purple.svg';
import bud from '../assets/bud.svg';
import AuthLayout from './AuthLayout';

const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying to log in")

    const success = await loginUser(username, password);

    if (success){
      console.log("Redirecting to the Subject page")
      navigate('/subject');
    } else {
      console.log("Log in failed");
    }
  };
  
  return (
    <>
      <AuthLayout>        
            <img src={bud} alt="" className="bud" />
            <div className="login-message">
              <p>Welcome back!</p>
              <p>Log in to your account to continue.</p>
            </div>
        
            <div className="login-form-cont">
              <form onSubmit={handleSubmit}>
                <div className="username form-inputs-name">
                  <p>username</p>
                  <input 
                    type="text" 
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
    
                <div className="password form-inputs-name">
                  <p>password</p>
                  <input 
                    type="password" 
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
    
                <p className="question">
                  Forgot your password?
                </p>
    
                <button type='submit'>LOGIN</button>
    
                <p className="question">
                  Don't have an account? &nbsp;
                  <Link to='/signup'>
                    Sign up
                  </Link>
                </p>
    
              </form>
    
            </div>
      </AuthLayout>
    </>
  )
}

export default Login