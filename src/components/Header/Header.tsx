import React from 'react';

import './Header.scss';

import { FaSearch } from 'react-icons/fa';

const Header = (): JSX.Element => {
  return (
    <header className="Header">
      <div>
        <FaSearch className="icon" />
        <input className="search edit-box" placeholder="검색" />
      </div>
    </header>
  );
};

export default Header;
