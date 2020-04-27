import React, { useReducer, useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';
import TodoList from '@components/TodoList/TodoList';
import ContextualMenu from '@components/ContextualMenu/ContextualMenu';
import {
  TodoData,
  SidebarData,
  SidebarItems,
  ContextualMenuItem,
  ConfigData,
} from '@interfaces/index';

import './App.scss';
import { todoDummy } from '~/fakeData';

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

interface ContextualMenuData {
  isActive: boolean;
  items: ContextualMenuItem[];
  posX: number;
  posY: number;
}

const contextualMenuDisable: ContextualMenuData = {
  isActive: false,
  items: [],
  posX: 0,
  posY: 0,
};

const App = (): JSX.Element => {
  const [todos, dispatch] = useReducer(todoReducer, todoDummy);
  const [contextualMenu, setContextualMenu] = useState<ContextualMenuData>(
    contextualMenuDisable,
  );
  const [sidebar, setSidebar] = useState<SidebarData>({
    currentItem: 'today',
    isActive: true,
    isOverlaidActive: false,
  });
  const [config, setConfig] = useState<ConfigData>({ showTodayFinish: true });
  const [search, setSearch] = useState({ isActive: false, keyword: '' });

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

  const handleChangeSearchKeyword = (keyword: string): void => {
    setSearch({ isActive: true, keyword });
  };

  const handleDisableSearchMode = (): void => {
    setSearch({ isActive: false, keyword: '' });
  };

  const handleChangeSidebarMenu = (item: SidebarItems): void => {
    // 가로폭이 좁을 때 메뉴 변경시 사이드바를 끈다.
    if (overlaid) {
      setSidebar({ ...sidebar, currentItem: item, isOverlaidActive: false });
    } else {
      setSidebar({ ...sidebar, currentItem: item });
    }
    handleDisableSearchMode();
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

  const handleTodoRightClick = (
    id: number,
    posX: number,
    posY: number,
  ): void => {
    const items: ContextualMenuItem[] = [
      {
        isTitle: false,
        icon: 'delete',
        text: '작업 삭제',
        onClick: (): void => handleDeleteTodo(id),
      },
    ];
    setContextualMenu({ isActive: true, items, posX, posY });
  };

  const handleTitleOptionsClick = (posX: number, posY: number): void => {
    const items: ContextualMenuItem[] = [
      {
        isTitle: true,
        text: '목록 옵션',
      },
      {
        isTitle: false,
        icon: 'check',
        text: config.showTodayFinish
          ? '완료한 작업 숨기기'
          : '완료된 작업 표시',
        onClick: (): void =>
          setConfig({ ...config, showTodayFinish: !config.showTodayFinish }),
      },
    ];
    setContextualMenu({ isActive: true, items, posX, posY });
  };

  const handleClick = (): void => {
    setContextualMenu(contextualMenuDisable);
    if (!search.keyword) {
      handleDisableSearchMode();
    }
  };

  return (
    <div className="App" onClick={handleClick}>
      <Header
        isSearchMode={search.isActive}
        onToggleSidebar={handleToggleSidebar}
        onChangeSearchKeyword={handleChangeSearchKeyword}
        onDisableSearchMode={handleDisableSearchMode}
      />
      <main className="main">
        <div
          className={cn('sidebar-overlay', {
            visible: sidebar.isOverlaidActive && overlaid,
          })}
          onClick={(): void => handleToggleSidebar()}
        ></div>
        <Sidebar
          isSearchMode={search.isActive}
          sidebar={sidebar}
          onChangeSidebarMenu={handleChangeSidebarMenu}
        />
        <section className="section">
          <Title
            search={search}
            currentItem={sidebar.currentItem}
            onTitleOptionsClick={handleTitleOptionsClick}
          />
          <TodoList
            search={search}
            currentItem={sidebar.currentItem}
            todos={todos}
            config={config}
            onEditTodoText={handleEditTodoText}
            onEditTodoTime={handleEditTodoTime}
            onStartTodo={handleStartTodo}
            onFinishTodo={handleFinishTodo}
            onAddTodo={handleAddTodo}
            onReorderTodo={handleReorderTodo}
            onContextMenu={handleTodoRightClick}
            onCloseContextMenu={handleClick}
          />
        </section>
      </main>
      <ContextualMenu
        isActive={contextualMenu.isActive}
        items={contextualMenu.items}
        posX={contextualMenu.posX}
        posY={contextualMenu.posY}
      />
    </div>
  );
};

export default App;
