import React, { useState, useRef, useCallback } from 'react';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import TodoList from '@components/TodoList/TodoList';
import TodoContextMenu from '@components/TodoContextMenu/TodoContextMenu';

import './App.scss';
import { todoDummy } from '~/fakeData';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(todoDummy);

  const contextMenuDisable = {
    id: -1,
    active: false,
    posX: 0,
    posY: 0,
  };
  const [contextMenu, setContextMenu] = useState(contextMenuDisable);
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

  const handleTodoContextMenu = (
    id: number,
    posX: number,
    posY: number,
  ): void => {
    setContextMenu({ id, active: true, posX, posY });
  };

  const handleOnClick = (): void => {
    setContextMenu(contextMenuDisable);
  };

  return (
    <div className="App" onClick={handleOnClick}>
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
            onContextMenu={handleTodoContextMenu}
          />
        </section>
      </main>
      <TodoContextMenu
        id={contextMenu.id}
        active={contextMenu.active}
        posX={contextMenu.posX}
        posY={contextMenu.posY}
      />
    </div>
  );
};

export default App;
