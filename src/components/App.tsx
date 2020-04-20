import React, { useReducer, useState, useRef, useCallback } from 'react';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import TodoList from '@components/TodoList/TodoList';
import TodoContextMenu from '@components/TodoContextMenu/TodoContextMenu';

import './App.scss';
import { TodoData } from '@interfaces/index';
import { todoDummy } from '~/fakeData';

type Action =
  | { type: 'add'; todo: TodoData }
  | { type: 'edit_text'; id: number; text: string }
  | { type: 'edit_time'; id: number; time: number }
  | { type: 'start' | 'finish' | 'delete'; id: number };

const todoReducer = (todos: TodoData[], action: Action): TodoData[] => {
  switch (action.type) {
    case 'add':
      return todos.concat(action.todo);
    case 'edit_text':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo,
      );
    case 'edit_time':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, targetMinutes: action.time } : todo,
      );
    case 'start':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, startTime: new Date() } : todo,
      );
    case 'finish':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, finishTime: new Date() } : todo,
      );
    case 'delete':
      return todos.filter((todo) => todo.id !== action.id);
  }
};

const contextMenuDisable = {
  id: -1,
  active: false,
  posX: 0,
  posY: 0,
};

const App = (): JSX.Element => {
  const [todos, dispatch] = useReducer(todoReducer, todoDummy);
  const [contextMenu, setContextMenu] = useState(contextMenuDisable);
  const nextId = useRef(todoDummy.length);

  const handleAddTodo = useCallback(
    (text: string, targetMinutes: number): void => {
      dispatch({
        type: 'add',
        todo: { id: nextId.current, text, targetMinutes },
      });
      nextId.current++;
    },
    [],
  );

  const handleEditTodoText = useCallback((id: number, text: string): void => {
    dispatch({ type: 'edit_text', id, text });
  }, []);

  const handleEditTodoTime = useCallback((id: number, time: number): void => {
    dispatch({ type: 'edit_time', id, time });
  }, []);

  const handleStartTodo = useCallback((id: number): void => {
    dispatch({ type: 'start', id });
  }, []);

  const handleFinishTodo = useCallback((id: number): void => {
    dispatch({ type: 'finish', id });
  }, []);

  const handleDeleteTodo = useCallback((id: number): void => {
    dispatch({ type: 'delete', id });
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
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default App;
