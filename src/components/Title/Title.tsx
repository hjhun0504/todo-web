import React from 'react';
import { SidebarItems } from '@interfaces/index';

import './Title.scss';

interface Props {
  currentItem: SidebarItems;
}

const week = ['일', '월', '화', '수', '목', '금', '토'];

const titleElem = (title: string): JSX.Element => (
  <div className="title">{title}</div>
);

const getTitle = (menu: SidebarItems): JSX.Element => {
  switch (menu) {
    case 'today':
      const time = new Date();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const day = week[time.getDay()];
      return (
        <>
          {titleElem('오늘')}
          <div className="date">
            {month}월 {date}일, {day}요일
          </div>
        </>
      );
    case 'history':
      return <>{titleElem('기록')}</>;
  }
};

const Title = (props: Props): JSX.Element => {
  const { currentItem } = props;

  return <div className="Title">{getTitle(currentItem)}</div>;
};

export default Title;
