import React, { useState } from 'react';
import './Header.css';
import { BiCategory } from "react-icons/bi";
import { RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const navigate = useNavigate();

  const handleCategoryButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  const handleLogoButtonClick = () => {
    window.location.replace('/');
  }

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header_left">
        <button className="header_category_button" onClick={handleCategoryButtonClick}><BiCategory /></button>
      </div>
      <div className="header_center" onClick={handleLogoButtonClick}>ez-ask</div>
      <div className="header_right">
        <button className="header_login_button" onClick={handleLoginButtonClick}><RiLoginBoxLine /></button>
      </div>
    </header>
  );
}

export default Header;
