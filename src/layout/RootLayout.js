import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
