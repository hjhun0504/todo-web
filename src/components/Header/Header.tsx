import React from 'react';

import { FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

import './Header.scss';

interface Props {
  onToggleSidebar: () => void;
}

const Header = (props: Props): JSX.Element => {
  const { onToggleSidebar } = props;

  return (
    <header className="Header">
      <div className="menu" onClick={(): void => onToggleSidebar()}>
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
