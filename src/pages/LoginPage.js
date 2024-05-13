import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './LoginPage.css';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const LoginPage = () => {
  const handleGoogleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      axios.post(
        `http://localhost:3000/api/auth/login/google`,
        { code },
      )
      .then(({data}) => {
        localStorage.clear();
        localStorage.setItem('access_token', data.tokens.accessToken);
        localStorage.setItem('refresh_token', data.tokens.refreshToken);

        if (data.isNew) {
          alert('정상적으로 가입되었습니다.');
        }
        
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
        alert('로그인에 실패했습니다.');
      })
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
      alert('구글 계정 연동 중에 에러가 발생했습니다.');
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