import React from 'react';
import './Footer.css';
import { IoHomeOutline } from "react-icons/io5";

function Footer() {
  const handleHomeButtonClick = () => {
    window.location.replace('/');
  }
  
  // 조건부 렌더링
  // 로그인 안했을 시: 홈
  // 로그인 했을 시: 새 글 작성, 홈, 프로필 
  return (
    <footer className='footer'>
      <div className='footer_center'>
        <button className='footer_home_button' onClick={handleHomeButtonClick}>
          <IoHomeOutline className='footer_home_button' />
        </button>
      </div> 
    </footer>
  );
}

export default Footer;
