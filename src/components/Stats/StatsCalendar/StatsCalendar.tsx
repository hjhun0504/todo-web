import React from 'react';
import Tippy from '@tippyjs/react';
import cn from 'classnames';
import 'tippy.js/dist/tippy.css';

import './StatsCalendar.scss';

import { getDateText, getDateId } from '@utils/index';
import { TodoData, StatsData } from '@interfaces/index';

interface DayProps {
  date: Date;
  active: boolean;
  completeTodos: number;
  color: string;
  onChangeDate: (date: Date) => void;
}

const Day = (props: DayProps): JSX.Element => {
  const { date, active, completeTodos, color, onChangeDate } = props;

  return (
    <Tippy content={`${completeTodos} 작업 완료, ${getDateText(date)}`}>
      <div
        className={cn('day', { active })}
        onClick={(): void => onChangeDate(date)}
        style={{ background: color }}
      ></div>
    </Tippy>
  );
};

interface Props {
  currentDate: Date | null;
  todos: TodoData[];
  statsData: StatsData;
  onChangeDate: (date: Date) => void;
}

const StatsCalendar = (props: Props): JSX.Element => {
  const { currentDate, todos, statsData, onChangeDate } = props;

  const getColor = (count: number): string => {
    if (!statsData.stats) return '';
    const averageCount = statsData.stats.averageCount;
    const maxCount = statsData.stats.maxCount;

    if (count >= maxCount * 0.8) {
      return '#196127';
    } else if (count >= maxCount * 0.6) {
      return '#239a3b';
    } else if (count >= averageCount) {
      return '#7bc96f';
    } else if (count >= 1) {
      return '#c6e48b';
    } else {
      return '#ebedf0';
    }
  };

  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
  );
  startDate.setDate(startDate.getDate() - 365);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks: JSX.Element[] = [];

  let days: JSX.Element[] = [];
  let index = 0;
  let count = 0;
  let month = null;
  let monthStr = '';

  weeks.push(
    <span key={index} className="week">
      <div className="month"></div>
      <div className="day"></div>
      <div className="day">월</div>
      <div className="day"></div>
      <div className="day">수</div>
      <div className="day"></div>
      <div className="day">금</div>
      <div className="day"></div>
    </span>,
  );

  while (startDate.getTime() < today.getTime()) {
    const completeTodos = statsData[getDateId(startDate)]
      ? statsData[getDateId(startDate)].count
      : 0;

    days.push(
      <Day
        key={index}
        date={new Date(startDate)}
        active={currentDate?.getTime() === startDate.getTime()}
        completeTodos={completeTodos}
        color={getColor(completeTodos)}
        onChangeDate={onChangeDate}
      />,
    );

    // 이번 주, 저번 주 첫번째 날의 달을 비교해서 다르면 월 텍스트를 추가한다.
    if (count === 0) {
      if (month !== startDate.getMonth()) {
        monthStr = `${startDate.getMonth() + 1}월`;
        month = startDate.getMonth();
      } else {
        monthStr = '';
      }
    }

    startDate.setDate(startDate.getDate() + 1);
    count++;
    index++;

    if (count === 7 || startDate.getTime() > today.getTime()) {
      weeks.push(
        <span key={index} className="week">
          <div className="month">{monthStr}</div>
          {days.map((day) => day)}
        </span>,
      );
      days = [];
      count = 0;
    }
  }

  return (
    <div className="StatsCalendar">
      <div className="calendar-container">
        <div className="years">
          <div>2020년</div>
          <div>2019년</div>
        </div>
        <div className="day-list">{weeks.reverse()}</div>
      </div>
    </div>
  );
};

export default StatsCalendar;
