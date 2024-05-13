import React, { useEffect } from 'react';
import axios from 'axios';

const TokenRefresher = () => {
  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: `http://localhost:3000/api`,
      headers: {"Content-Type": "application/json"}
    });

    const interceptor = axios.interceptors.response.use(
      // 응답 성공
      (response) => { return response; },
      
      async (error) => {
        console.log(error.response);
        const originalConfig = error.config; // 기존에 수행하려고 했던 작업
        const errorName = error.response.data.name; // error msg from backend
        const status = error.response.status; // 현재 발생한 에러 코드
  
        if (status === 401) {
          // access token 재발급 요청
          if (errorName === 'AccessTokenHasExpired') {
            await axios.post(
              `http://localhost:3000/api/auth/refresh`,
              {
                headers: {
                  Authorization: `${localStorage.getItem('Authorization')}`,
                  Refresh: `${localStorage.getItem('refresh_token')}`,
                },
              },
            )
            .then((response) => {
              localStorage.setItem('access_token', response.data.accessToken);
              localStorage.setItem('refresh_token', response.data.refreshToken);
  
              // 재발급 받은 토큰으로 실패한 요청 재시도
              originalConfig.headers["authorization"]="Bearer "+response.headers.authorization;
              
              // console.log("New access token obtained.");
              // 새로운 토큰으로 재요청
              return refreshAPI(originalConfig);
            })
            .catch((error) => {
              console.error('토큰을 갱신하는 동안 에러가 발생했습니다.', error);
            })
          } else if (errorName === 'RefreshTokenHasExpired') {
            localStorage.clear();
            window.alert('세션이 만료되어 로그아웃되었습니다. 다시 로그인해주세요.');
            window.location.href = `/login`;
          }
        } else if (status === 400 || status === 404 || status === 409) {
          console.log(error);
        }
        
        // 다른 모든 오류를 거부하고 처리
        return Promise.reject(error);
      },
    );
  
    return () => {
      axios.interceptors.response.eject(interceptor);
    }
  }, []);
  
  return (
    <div></div>
  )
}

export default TokenRefresher;