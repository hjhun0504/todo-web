import React, { useState, useRef, useCallback } from 'react';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import TodoList from '@components/TodoList/TodoList';

import './App.scss';
import { todoDummy } from '~/fakeData';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(todoDummy);
  const nextId = useRef(todoDummy.length);

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
    <div className="App">
      <Header />
      <main className="main">
        <Sidebar />
        <section className="section">
          <TodoList
            todos={todos}
            onEditTodoText={handleEditTodoText}
            onEditTodoTime={handleEditTodoTime}
            onStartTodo={handleStartTodo}
            onFinishTodo={handleFinishTodo}
            onAddTodo={handleAddTodo}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
