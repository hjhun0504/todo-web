import React from 'react';
import { SidebarItems } from '@interfaces/index';
import { IoIosMore } from 'react-icons/io';

import './Title.scss';

interface Props {
  currentItem: SidebarItems;
}

const week = ['일', '월', '화', '수', '목', '금', '토'];

const Title = (props: Props): JSX.Element => {
  const { currentItem } = props;
  const moreButton = React.createRef<HTMLDivElement>();

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  switch (currentItem) {
    case 'today':
      const time = new Date();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const day = week[time.getDay()];
      return (
        <div className="Title">
          <div className="title">
            <span className="text">오늘</span>
            <div className="icon" ref={moreButton} onClick={handleClick}>
              <IoIosMore />
            </div>
          </div>
          <div className="date">
            {month}월 {date}일, {day}요일
          </div>
        </div>
      );
    case 'history':
      return (
        <div className="Title">
          <div className="title">
            <span className="text">기록</span>
          </div>
        </div>
      );
  }
};

export default Title;
