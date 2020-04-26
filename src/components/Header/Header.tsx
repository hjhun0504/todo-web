import React, { useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

import './Header.scss';

interface Props {
  onChangeSearchKeyword: (keyword: string) => void;
  onDisableSearchMode: () => void;
  onToggleSidebar: () => void;
}

const Header = (props: Props): JSX.Element => {
  const { onToggleSidebar, onChangeSearchKeyword, onDisableSearchMode } = props;
  const [keyword, setKeyword] = useState<string>('');
  const searchRef = React.createRef<HTMLInputElement>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
    onChangeSearchKeyword(event.target.value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.keyCode === 27) {
      setKeyword('');
      onDisableSearchMode();
      searchRef.current?.blur();
    }
  };

  return (
    <header className="Header">
      <div className="menu" onClick={(): void => onToggleSidebar()}>
        <MdMenu />
      </div>
      <div>
        <FaSearch className="icon" />
        <input
          className="search edit-box"
          placeholder="검색"
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={searchRef}
        />
      </div>
    </header>
  );
};

export default Header;
