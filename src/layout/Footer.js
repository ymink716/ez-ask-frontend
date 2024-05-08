import React from 'react';
import './Footer.css';
import { IoHomeOutline } from "react-icons/io5";

function Footer() {
  const handleHomeButtonClick = () => {
    window.location.replace('/');
  }
  
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
