import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import backIcon from '../assets/images/back-icon.png';
const Header = ({ pageTitle, showBackButton }) => {
  return (
    <div className="header">
      {showBackButton && (
        <Link to="../" className="link">
          <img alt="Back icon" src ={backIcon} />
        </Link>
      )}
      <h1 className="title">{pageTitle}</h1>
    </div>
  );
};

export default Header;
