import React from 'react';

import './Header.scss';

import { FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

const Header = (): JSX.Element => {
  return (
    <header className="Header">
      <div className="menu">
        <MdMenu />
      </div>
      <div>
        <FaSearch className="icon" />
        <input className="search edit-box" placeholder="검색" />
      </div>
    </header>
  );
};

export default Header;
