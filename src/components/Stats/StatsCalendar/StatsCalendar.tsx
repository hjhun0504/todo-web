import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import './StatsCalendar.scss';

import { TodoData } from '@interfaces/index';

interface DayProps {
  date: Date;
}

const Day = (props: DayProps): JSX.Element => {
  const { date } = props;

  return (
    <Tippy content={date.toString()}>
      <div className="day"></div>
    </Tippy>
  );
};

interface Props {
  todos: TodoData[];
}

const StatsCalendar = (props: Props): JSX.Element => {
  const { todos } = props;

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
  while (startDate.getTime() < today.getTime()) {
    days.push(<Day key={index} date={new Date(startDate)} />);

    startDate.setDate(startDate.getDate() + 1);
    count++;
    index++;

    if (count === 7 || startDate.getTime() > today.getTime()) {
      weeks.push(
        <span key={index} className="week">
          {days.map((day) => day)}
        </span>,
      );
      days = [];
      count = 0;
    }
  }

  console.log(weeks.length);

  return (
    <div className="StatsCalendar">
      <div className="calendar-container">
        <div className="day-list">{weeks}</div>
        <div className="years"></div>
      </div>
    </div>
  );
};

export default StatsCalendar;
