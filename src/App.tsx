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

  const handleEditTodoTime = (id: number, editedTime: number): void => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, targetTime: editedTime } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoAdd onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onEditTodoTime={handleEditTodoTime} />
    </div>
  );
};

export default App;
