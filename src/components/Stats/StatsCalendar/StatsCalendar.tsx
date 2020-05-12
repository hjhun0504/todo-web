import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import './StatsCalendar.scss';

import { isSameDate, getDateText } from '@utils/index';
import { TodoData } from '@interfaces/index';

interface DayProps {
  date: Date;
  completeTodos: number;
  onChangeDate: (date: Date) => void;
}

const Day = (props: DayProps): JSX.Element => {
  const { date, completeTodos, onChangeDate } = props;

  return (
    <Tippy content={`${completeTodos} 작업 완료, ${getDateText(date)}`}>
      <div className="day" onClick={(): void => onChangeDate(date)}></div>
    </Tippy>
  );
};

interface Props {
  todos: TodoData[];
  onChangeDate: (date: Date) => void;
}

const StatsCalendar = (props: Props): JSX.Element => {
  const { todos, onChangeDate } = props;

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
    const completeTodos = todos.filter(
      (todo) =>
        todo.startTime &&
        todo.finishTime &&
        isSameDate(todo.startTime, startDate),
    ).length;

    days.push(
      <Day
        key={index}
        date={new Date(startDate)}
        completeTodos={completeTodos}
        onChangeDate={onChangeDate}
      />,
    );

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
