import React, { useState, useRef, useCallback } from 'react';
import TodoAdd from '@components/TodoAdd';
import TodoList from '@components/TodoList';

import './App.scss';

import { todoDummy } from '~/fakeData';
import Header from './Header/Header';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(todoDummy);
  const nextId = useRef(4);

  const handleAddTodo = useCallback(
    (text: string, targetTime: number): void => {
      setTodos((todos) =>
        todos.concat({
          id: nextId.current,
          text,
          targetMinutes: targetTime,
        }),
      );
      nextId.current++;
    },
    [],
  );

  const handleEditTodoText = useCallback(
    (id: number, editedText: string): void => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editedText } : todo,
        ),
      );
    },
    [],
  );

  const handleEditTodoTime = useCallback(
    (id: number, editedTime: number): void => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, targetMinutes: editedTime } : todo,
        ),
      );
    },
    [],
  );

  const handleStartTodo = useCallback((id: number): void => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, startTime: new Date() } : todo,
      ),
    );
  }, []);

  const handleFinishTodo = useCallback((id: number): void => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, finishTime: new Date() } : todo,
      ),
    );
  }, []);

  return (
    <div>
      <Header />
      <section className="Section">
        <TodoList
          todos={todos}
          onEditTodoText={handleEditTodoText}
          onEditTodoTime={handleEditTodoTime}
          onStartTodo={handleStartTodo}
          onFinishTodo={handleFinishTodo}
        />
        <TodoAdd onAddTodo={handleAddTodo} />
      </section>
    </div>
  );
};

export default App;
