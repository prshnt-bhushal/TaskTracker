import React from 'react';

const Navbar = () => {
  return (
    <header>
      <nav>
        <a href="/" className="nav-logo">
          Task Tracker
        </a>
        <ul>
          <li className="nav-item">
            <a href="/tasks">Start Tracking</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
