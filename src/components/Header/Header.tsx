import React, { useState, useEffect } from 'react';

import { FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

import CustomButton from '@components/CustomButton/CustomButton';

import './Header.scss';

interface Props {
  isSearchMode: boolean;
  onChangeSearchKeyword: (keyword: string) => void;
  onDisableSearchMode: () => void;
  onToggleSidebar: () => void;
}

const Header = (props: Props): JSX.Element => {
  const {
    isSearchMode,
    onToggleSidebar,
    onChangeSearchKeyword,
    onDisableSearchMode,
  } = props;
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

  useEffect(() => {
    if (!isSearchMode) {
      setKeyword('');
    }
  }, [isSearchMode]);

  return (
    <header className="Header">
      <div className="left">
        <div className="menu" onClick={(): void => onToggleSidebar()}>
          <MdMenu />
        </div>
        <div className="search-box">
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
      </div>
      <div className="right-menu">
        <CustomButton value="로그인" />
      </div>
    </header>
  );
};

export default Header;
