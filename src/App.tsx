import React, { useState, useEffect } from 'react';
import TodoAdd from '@components/TodoAdd';
import TodoList from '@components/TodoList';

import { todoDummy } from '~/fakeData';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(todoDummy);

  useEffect(() => {
    console.log(todos);
  }, []);

  return (
    <div>
      <TodoAdd />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
