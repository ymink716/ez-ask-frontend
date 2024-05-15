import React, { useState, useEffect } from 'react';
import './Footer.css';
import { IoHomeOutline } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function Footer() {
  const [isLogin, setIsLogin] = useState(false);
  const ACCESS_TOKEN = localStorage.getItem('access_token');
  useEffect(() => {
    if (ACCESS_TOKEN) {
      setIsLogin(true);
    }
  }, [ACCESS_TOKEN])
  
  const handleHomeButtonClick = () => {
    window.location.replace('/');
  }
  
  const handleWriteQuestionButtonClick = () => {
    window.location.replace('/questions/write');
  }

  const handleProfileButtonClick = () => {
    window.location.replace('/profile');
  }

  return (
    <footer className='footer'>
      {isLogin
        ?
        <div className='footer-wrapper'>
        <div className='footer_left'>
          <button onClick={handleWriteQuestionButtonClick}>
            <IoMdCreate />
          </button>
        </div>
        <div className='footer_center'>
          <button onClick={handleHomeButtonClick}>
            <IoHomeOutline />
          </button>
        </div>
        <div className='footer_right'>
          <button onClick={handleProfileButtonClick}>
            <FaUser />
          </button>
        </div>
        </div>
        :
        <div className='footer-wrapper'>
        <div className='footer_left'>
        </div>
        <div className='footer_center'>
          <button onClick={handleHomeButtonClick}>
            <IoHomeOutline />
          </button>
        </div>
        <div className='footer_right'>  
        </div>
        </div>
      }
    </footer>
  );
}

export default Footer;
