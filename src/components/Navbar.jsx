import React from 'react'
import {
  Link
} from "react-router-dom";
import { useState } from 'react';

function Navbar() {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">CF-Sprint</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to = "/home" className={`nav-link   ${activeLink === 'home' ? `active` : ``}`} onClick={() => handleLinkClick('home')}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to = "/about" className={`nav-link   ${activeLink === 'about' ? `active` : ``}`} onClick={() => handleLinkClick('about')}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
