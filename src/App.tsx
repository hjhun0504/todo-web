import React, { useState, useRef } from 'react';
import TodoAdd from '@components/TodoAdd';
import TodoList from '@components/TodoList';

import { todoDummy } from '~/fakeData';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(todoDummy);
  const nextId = useRef(4);

  const handleAddTodo = (text: string, targetTime: number): void => {
    const updatedTodos = todos.concat({ id: nextId.current, text, targetTime });
    setTodos(updatedTodos);
    nextId.current++;
  };

  return (
    <div>
      <TodoAdd onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
