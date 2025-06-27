import React, { useContext, useState, useNavigate } from 'react';
import './login.css';
import { AuthContext } from '../context/AuthContext';

import glasses from '../assets/glasses-purple.svg';
import bud from '../assets/bud.svg';

const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) navigate('/subjects');
    else alert('Invalid credentials');
  };
  
  
  
  return (
    <>
    <div className='login-body'>
      <div className="left-side">
        <img src={glasses} alt="" className="glasses" />
        <div className="logo-name">
          <p className="name">STUDBUD</p>
        </div>

        <div className="welcome-greet">
          <p>WELCOME MY STUDY BUDDY</p>
          <p>come and lets get learning!</p>
        </div>
      </div>

      <div className="right-side">
        <img src={bud} alt="" className="bud" />
        <div className="login-message">
          <p>Welcome back!</p>
          <p>Log in to your account to continue.</p>
        </div>
    
        <div className="login-form-cont">
          <form action="handlesubmit">
            <div className="username">
              <p>username</p>
              <input 
                type="text" 
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>

            <div className="password">
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
              Don't have an account? Sign up
            </p>

          </form>

        </div>

      </div>

    </div>
    
    </>
  )
}

export default Login