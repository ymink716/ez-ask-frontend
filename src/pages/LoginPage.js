import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './LoginPage.css';
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const handleGoogleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      axios.post(
        `http://localhost:3000/api/auth/login/google`,
        { code }
      )
      .then(response => {
        console.log(response);
        localStorage.clear();
        localStorage.setItem('access_token', response.data.tokens.accessToken);
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

        if (response.data.isNew) {
          alert('정상적으로 가입되었습니다.');
        }

        window.location.href = '/';
      })
      .catch(error => {
        console.error(error);
      })
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  return (
    <div id='login-content-wrapper'>      
      <button id='google-login-button' onClick={handleGoogleLogin}>
        <FcGoogle /> Google 계정으로 Login
      </button>
    </div>
  );
};

export default LoginPage;