import React, { useEffect } from 'react';
import axios from 'axios';

const TokenRefresher = () => {
  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: `${process.env.REACT_APP_API_SERVER_URL}/api`,
      headers: { "Content-Type": "application/json" }
    });

    const interceptor = axios.interceptors.response.use(
      // 응답 성공 시 그대로 응답을 반환
      (response) => { return response },
      
      // 에러 시
      async (error) => {    
        const originalConfig = error.config; // 기존에 수행하려고 했던 작업
        const errorName = error.response.data.error; 
        const status = error.response.status; 
        
        if (status === 401) {
          // token 재발급 요청
          if (errorName === 'AccessTokenHasExpired') {
            await axios({
              url: `${process.env.REACT_APP_API_SERVER_URL}/api/auth/refresh`,
              method: 'post',
              data: {
                refresh: `${localStorage.getItem('refresh_token')}`,
              }
            })
            .then((response) => {
              localStorage.setItem('access_token', response.data.accessToken);
              localStorage.setItem('refresh_token', response.data.refreshToken);
  
              // 재발급 받은 토큰으로 실패한 요청 재시도
              originalConfig.headers["Authorization"]="Bearer "+response.data.accessToken;              
              return refreshAPI(originalConfig);
            })
            .then(res => {
              window.location.reload();
            })
            // .catch(err => {
            //   console.error('An error occurred while refreshing the token:', err);
            // })
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
    
    // 컴포넌트가 사라질 때 설정한 인터셉터 제거 (다른 컴포넌트나 페이지에서 영향 방지)
    return () => {
      axios.interceptors.response.eject(interceptor);
    }
  }, []);
  
  return (
    <div></div>
  )
}

export default TokenRefresher;