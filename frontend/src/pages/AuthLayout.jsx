import React from 'react'
import glasses from '../assets/glasses-purple.svg';


const AuthLayout = ({children}) => {
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
            {children}
          </div>
{/*           
          <div className="right-side">
            <img src={bud} alt="" className="bud" />
            <div className="login-message">
              <p>Welcome back!</p>
              <p>Log in to your account to continue.</p>
            </div>
        
            <div className="login-form-cont">
              <form onSubmit={handleSubmit}>
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
     */}
          {/* <div className="right-side">
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
                    type="text" 
                    placeholder='email'
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
                  Don't have an account? Sign up
                </p>
    
              </form>
    
            </div>
    
          </div> */}
        </div>
    
    
    </>
  )
}

export default AuthLayout