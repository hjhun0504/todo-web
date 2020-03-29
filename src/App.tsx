import React from 'react';
import TodoAdd from '@components/TodoAdd';
import TodoList from '@components/TodoList';

const App = (): JSX.Element => {
  return (
    <div>
      <TodoAdd />
      <TodoList />
    </div>
  );
};

export default App;
