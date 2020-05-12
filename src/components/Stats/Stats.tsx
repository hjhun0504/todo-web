import React, { useState } from 'react';
import StatsCalendar from '@components/Stats/StatsCalendar/StatsCalendar';

import './Stats.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
}

const Stats = (props: Props): JSX.Element => {
  const { todos } = props;

  const [date, setDate] = useState<Date | null>(null);

  const handleChangeDate = (date: Date): void => {
    setDate(date);
  };

  return (
    <div className="Stats">
      <StatsCalendar todos={todos} onChangeDate={handleChangeDate} />
    </div>
  );
};

export default Stats;
