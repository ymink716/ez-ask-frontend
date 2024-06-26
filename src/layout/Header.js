import React from 'react';
import './Header.css';
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem('access_token');

  const handleLogoButtonClick = () => {
    window.location.replace('/');
  }

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    alert('로그아웃 되었습니다.');
    window.location.replace('/');
  }

  return (
    <header className="header">
      <div className="header_left"></div>
      <div className="header_center" onClick={handleLogoButtonClick}>ez-ask</div>
      <div className="header_right">
      {ACCESS_TOKEN
        ? <button className="header_logout_button" onClick={handleLogoutButtonClick}><RiLogoutBoxLine /></button>
        : <button className="header_login_button" onClick={handleLoginButtonClick}><RiLoginBoxLine />
        </button>
      }
      </div>
    </header>
  );
}

export default Header;
