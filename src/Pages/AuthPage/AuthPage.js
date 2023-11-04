import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import './AuthPage.css';
import LoginForm from '../../Components/Registration/LoginForm';
import SignupForm from '../../Components/Registration/SignupForm';
import UserAPI from '../../Apis/UserAPI';
import { AuthContext } from '../../Components/AuthContext/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (isAuthenticated)
      navigate("/homepage");
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = { username, password };
    UserAPI.login(loginData)
    .then(response => login(response));
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const signupData = { username, password, email, firstName, lastName };
    UserAPI.signup(signupData);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-blue-100 p-6 rounded-lg shadow-md">
      <LoginForm 
        onLogin={handleLogin} 
        isLogin={isLogin} 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
      />
      <SignupForm 
        onSignup={handleSignup} 
        isLogin={isLogin} 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        email={email} 
        setEmail={setEmail} 
        firstName={firstName} 
        setFirstName={setFirstName} 
        lastName={lastName} 
        setLastName={setLastName} 
      />
        <button className="mt-4 text-blue-500" onClick={() => setIsLogin(!isLogin)}>
          { isLogin ? "Don't have an account? Sign up!" : "Already have an account? Log in!" }
        </button>
      </div>
    </div>
  );
}

export default AuthPage;