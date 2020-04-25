import React from 'react';
import { SidebarItems } from '@interfaces/index';
import { IoIosMore } from 'react-icons/io';

import './Title.scss';

interface Props {
  currentItem: SidebarItems;
}

const week = ['일', '월', '화', '수', '목', '금', '토'];

const getTitle = (menu: SidebarItems): JSX.Element => {
  switch (menu) {
    case 'today':
      const time = new Date();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const day = week[time.getDay()];
      return (
        <>
          <div className="title">
            <span className="text">오늘</span>
            <IoIosMore className="today-icon icon" />
          </div>
          <div className="date">
            {month}월 {date}일, {day}요일
          </div>
        </>
      );
    case 'history':
      return (
        <>
          <div className="title">
            <span className="text">기록</span>
          </div>
        </>
      );
  }
};

const Title = (props: Props): JSX.Element => {
  const { currentItem } = props;

  return <div className="Title">{getTitle(currentItem)}</div>;
};

export default Title;
