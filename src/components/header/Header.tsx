import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <h1>Portale Euris Finance</h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/dashboard">Negozi</Link>
          </li>
          <li>
            <Link to="/settings">Impostazioni</Link>
          </li>
          <li>
            <Link to="/help">Aiuto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
