import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './LoginPage.css';


const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.OAUTH_GOOGLE_ID}
		&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <div id='login-content-wrapper'>
      <button id='google-login-button' onClick={handleGoogleLogin}>
        <FcGoogle /> Google 계정으로 Login
      </button>
    </div>
  );
};

export default LoginPage;