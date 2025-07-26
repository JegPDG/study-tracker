import React, { useContext, useState } from 'react'
import AuthLayout from './AuthLayout'

import bud from '../assets/bud.svg';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const SignUp = () => {
  const {signUpUser} = useContext(AuthContext);
  const [newusername, setUsername] = useState('');
  const [newpassword, setPassword] = useState('');
  const [newemail, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying to sign up in")

    const success = await signUpUser(newusername, newemail, newpassword);

    if (success){
      console.log("Redirecting to the Subject page")
      navigate('/login');
    } else {
      console.log("Sign Up failed");
    }
  };
  



  return (
    <>
      <AuthLayout>
            <img src={bud} alt="" className="bud" />
            <div className="login-message">
              <p>Sign Up!</p>
              <p>Fill out the form and sign up to continue.</p>
            </div>
        
            <div className="login-form-cont">
              <form onSubmit={handleSubmit}>
                <div className="form-inputs-name">
                  <p>username</p>
                  <input 
                    type="text" 
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
    
                <div className="form-inputs-name">
                  <p>email</p>
                  <input 
                    type="email" 
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
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
    
                <button type='submit'>SIGN UP</button>
    
                <p className="question">
                  Already got an account? Go to &nbsp;
                  <span>
                    <Link to='/login'>
                      Login
                    </Link>
                  </span> 
                </p>
    
              </form>
    
            </div>
      </AuthLayout>
    </>
  )
}

export default SignUp