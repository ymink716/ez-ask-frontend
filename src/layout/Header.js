import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__categoryButton">카테고리</button>
      </div>
      <div className="header__center">
        <img src="ez-ask-logo.png" alt="ez-ask Logo" className="header__logo" />
      </div>
      <div className="header__right">
        <button className="header__loginButton">로그인</button>
      </div>
    </header>
  );
}

export default Header;
