import React from 'react';
import { useNavigate } from 'react-router-dom';



const GoogleLoginPage = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.OAUTH_GOOGLE_ID}
		&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <>
      <div>구글 로그인 페이지</div>
      <button onClick={handleLogin}>구글 로그인</button>
    </>
  );
};

export default GoogleLoginPage;