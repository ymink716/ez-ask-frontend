import React from 'react';

function Footer() {
  const handleHomeButtonClick = () => {
    window.location.replace('/');
  }
  
  return (
    <footer className='footer'>
      <div className='footer_center'>
        <button className='footer_home_button' onClick={handleHomeButtonClick}>
          홈으로
        </button>
      </div> 
    </footer>
  );
}

export default Footer;
