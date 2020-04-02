import React, { useState, useRef, useCallback } from 'react';
import TodoAdd from '@components/TodoAdd';
import TodoList from '@components/TodoList';

import { todoDummy } from '~/fakeData';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(todoDummy);
  const nextId = useRef(4);

  const handleAddTodo = useCallback(
    (text: string, targetTime: number): void => {
      const updatedTodos = todos.concat({
        id: nextId.current,
        text,
        targetTime,
      });
      setTodos(updatedTodos);
      nextId.current++;
    },
    [todos],
  );

  const handleEditTodoText = useCallback(
    (id: number, editedText: string): void => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo,
      );
      setTodos(updatedTodos);
    },
    [todos],
  );

  const handleEditTodoTime = useCallback(
    (id: number, editedTime: number): void => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, targetTime: editedTime } : todo,
      );
      setTodos(updatedTodos);
    },
    [todos],
  );

  return (
    <div>
      <TodoAdd onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onEditTodoText={handleEditTodoText}
        onEditTodoTime={handleEditTodoTime}
      />
    </div>
  );
};

export default App;
