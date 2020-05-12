import React from 'react';
import StatsCalendar from '@components/Stats/StatsCalendar/StatsCalendar';

import './Stats.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
}

const Stats = (props: Props): JSX.Element => {
  const { todos } = props;

  console.log(todos);

  return (
    <div className="Stats">
      <StatsCalendar todos={todos} />
    </div>
  );
};

export default Stats;
