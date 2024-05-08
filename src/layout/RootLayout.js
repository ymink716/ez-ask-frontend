import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { Outlet } from 'react-router-dom';
import './RootLayout.css';

function RootLayout() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <div className='footer-wrapper'>
        <Footer />
      </div>
      
    </>
  );
}

export default RootLayout;
