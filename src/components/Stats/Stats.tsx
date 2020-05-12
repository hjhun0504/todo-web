import React, { useState, useEffect } from 'react';
import StatsCalendar from '@components/Stats/StatsCalendar/StatsCalendar';

import './Stats.scss';

import { getDateId, getElapsedMinutes } from '@utils/index';
import { TodoData, StatsData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
}

const Stats = (props: Props): JSX.Element => {
  const { todos } = props;

  const [date, setDate] = useState<Date | null>(null);
  const [statsData, setStatsData] = useState<StatsData>({});

  useEffect(() => {
    const data: StatsData = {};

    todos.forEach((todo) => {
      if (todo.startTime && todo.finishTime) {
        const id = getDateId(todo.startTime);

        if (data[id]) {
          data[id].count += 1;
          data[id].minutes += getElapsedMinutes(
            todo.startTime,
            todo.finishTime,
          );
        } else {
          data[id] = {
            count: 1,
            minutes: getElapsedMinutes(todo.startTime, todo.finishTime),
          };
        }
      }
    });

    let dayCount = 0;
    let minutes = 0;
    let count = 0;
    let maxCount = 0;
    for (const key in data) {
      count += data[key].count;
      minutes += data[key].minutes;
      if (maxCount < data[key].count) {
        maxCount = data[key].count;
      }
      dayCount++;
    }

    data.stats = {
      averageCount: count / dayCount,
      averageMinutes: minutes / dayCount,
      maxCount,
    };

    setStatsData(data);
  }, []);

  const handleChangeDate = (date: Date): void => {
    setDate(date);
  };

  return (
    <div className="Stats">
      <StatsCalendar
        todos={todos}
        statsData={statsData}
        onChangeDate={handleChangeDate}
      />
      {statsData.stats ? (
        <div>
          <div>하루 평균 작업 개수: {statsData.stats.averageCount}</div>
          <div>하루 평균 작업 시간(분): {statsData.stats.averageMinutes}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Stats;
