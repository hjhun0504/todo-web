import React from 'react';
import { SidebarItems } from '@interfaces/index';
import { IoIosMore } from 'react-icons/io';
import { MdTimeline, MdToday } from 'react-icons/md';

import './Title.scss';

interface Props {
  search: {
    isActive: boolean;
    keyword: string;
  };
  currentItem: SidebarItems;
  isTimelineActive: boolean;
  onTitleOptionsClick: (posX: number, posY: number) => void;
  onToggleTimeline: () => void;
  onCalendarClick: (posX: number, posY: number) => void;
}

const week = ['일', '월', '화', '수', '목', '금', '토'];

const Title = (props: Props): JSX.Element => {
  const {
    search,
    currentItem,
    isTimelineActive,
    onTitleOptionsClick,
    onToggleTimeline,
    onCalendarClick,
  } = props;
  const moreButton = React.createRef<HTMLDivElement>();
  const calendarButton = React.createRef<HTMLDivElement>();

  const handleMoreButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    if (moreButton.current) {
      onTitleOptionsClick(
        moreButton.current?.getBoundingClientRect().left,
        moreButton.current?.getBoundingClientRect().bottom,
      );
    }
  };

  const handleCalendarClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    if (calendarButton.current) {
      onCalendarClick(
        calendarButton.current?.getBoundingClientRect().left,
        calendarButton.current?.getBoundingClientRect().bottom,
      );
    }
  };

  if (search.isActive) {
    return (
      <div className="Title">
        <div className="title">
          <span className="search">&quot;{search.keyword}&quot; 검색 중</span>
        </div>
      </div>
    );
  }

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
            <div className="icon-list">
              <div
                className="icon"
                onClick={(): void => onToggleTimeline()}
                style={{ color: isTimelineActive ? '#3498db' : 'gray' }}
              >
                <MdTimeline />
              </div>
              <div
                className="icon"
                ref={moreButton}
                onClick={handleMoreButtonClick}
              >
                <IoIosMore />
              </div>
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
            <div className="icon-list">
              <div
                className="icon"
                ref={calendarButton}
                onClick={handleCalendarClick}
              >
                <MdToday />
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default Title;
