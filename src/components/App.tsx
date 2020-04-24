import React, { useReducer, useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';
import TodoList from '@components/TodoList/TodoList';
import TodoContextMenu from '@components/TodoContextMenu/TodoContextMenu';
import { TodoData, SidebarData, SidebarItems } from '@interfaces/index';
import { todoDummy } from '~/fakeData';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './App.scss';

type Action =
  | { type: 'add'; todo: TodoData }
  | { type: 'edit_text'; id: number; text: string }
  | { type: 'edit_time'; id: number; time: number }
  | { type: 'start' | 'finish' | 'delete'; id: number }
  | { type: 'reorder'; sourceIndex: number; destinationIndex: number };

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
    case 'reorder':
      const result = Array.from(todos);
      const [moved] = result.splice(action.sourceIndex, 1);
      result.splice(action.destinationIndex, 0, moved);
      return result;
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
  const [sidebar, setSidebar] = useState<SidebarData>({
    currentItem: 'today',
    isActive: true,
    isOverlaidActive: false,
  });

  // 가로폭이 좁으면(768이하) overlaid 상태가 된다.
  const overlaid = useMediaQuery('(max-width:769px)');
  document.documentElement.className = overlaid ? 'overlaid' : '';

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

  const handleReorderTodo = useCallback(
    (sourceIndex: number, destinationIndex: number): void => {
      dispatch({ type: 'reorder', sourceIndex, destinationIndex });
    },
    [],
  );

  const handleTodoContextMenu = (
    id: number,
    posX: number,
    posY: number,
  ): void => {
    setContextMenu({ id, active: true, posX, posY });
  };

  const handleChangeSidebarMenu = (item: SidebarItems): void => {
    // 가로폭이 좁을 때 메뉴 변경시 사이드바를 끈다.
    if (overlaid) {
      setSidebar({ ...sidebar, currentItem: item, isOverlaidActive: false });
    } else {
      setSidebar({ ...sidebar, currentItem: item });
    }
  };

  const handleToggleSidebar = (): void => {
    if (!overlaid) {
      // 가로폭이 좁을 때 사이드바를 켜두었으면 사이드바를 끈다.
      if (sidebar.isOverlaidActive) {
        setSidebar({
          ...sidebar,
          isActive: false,
          isOverlaidActive: false,
        });
      } else {
        setSidebar({
          ...sidebar,
          isActive: !sidebar.isActive,
        });
      }
    } else {
      setSidebar({
        ...sidebar,
        isOverlaidActive: !sidebar.isOverlaidActive,
      });
    }
  };

  const closeContextMenu = (): void => {
    setContextMenu(contextMenuDisable);
  };

  return (
    <div className="App" onClick={closeContextMenu}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <main className="main">
        <div
          className={cn('sidebar-overlay', {
            visible: sidebar.isOverlaidActive && overlaid,
          })}
          onClick={(): void => handleToggleSidebar()}
        ></div>
        <Sidebar
          sidebar={sidebar}
          onChangeSidebarMenu={handleChangeSidebarMenu}
        />
        <section className="section">
          <Title currentItem={sidebar.currentItem} />
          <TodoList
            currentItem={sidebar.currentItem}
            todos={todos}
            onEditTodoText={handleEditTodoText}
            onEditTodoTime={handleEditTodoTime}
            onStartTodo={handleStartTodo}
            onFinishTodo={handleFinishTodo}
            onAddTodo={handleAddTodo}
            onReorderTodo={handleReorderTodo}
            onContextMenu={handleTodoContextMenu}
            onCloseContextMenu={closeContextMenu}
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
