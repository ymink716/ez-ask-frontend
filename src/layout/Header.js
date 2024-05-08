import React from 'react';
import './Header.css';
import { RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogoButtonClick = () => {
    window.location.replace('/');
  }

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header_left"></div>
      <div className="header_center" onClick={handleLogoButtonClick}>ez-ask</div>
      <div className="header_right">
        <button className="header_login_button" onClick={handleLoginButtonClick}><RiLoginBoxLine /></button>
      </div>
    </header>
  );
}

export default Header;
