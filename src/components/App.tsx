import React, {
  useReducer,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import produce from 'immer';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';
import Timeline from '@components/Timeline/Timeline';
import TodoList from '@components/TodoList/TodoList';
import ContextualMenu from '@components/ContextualMenu/ContextualMenu';
import Calendar from 'react-calendar';
import '@styles/calendar.scss';

import {
  TodoData,
  SidebarData,
  SidebarItems,
  ContextualMenuItem,
  ConfigData,
  SearchData,
  CalendarData,
} from '@interfaces/index';

import './App.scss';
import { todoDummy } from '~/fakeData';

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

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
  const [config, setConfig] = useState<ConfigData>({
    showTodayFinish: true,
    showTimeline: true,
  });
  const [search, setSearch] = useState<SearchData>({
    isActive: false,
    keyword: '',
  });
  const [calendar, setCalendar] = useState<CalendarData>({
    isActive: false,
    date: new Date(),
    posX: 0,
    posY: 0,
  });

  // 가로폭이 좁으면(768이하) overlaid 상태가 된다.
  const overlaid = useMediaQuery('(max-width:769px)');
  document.documentElement.className = overlaid ? 'overlaid' : '';

  const nextId = useRef(todoDummy.length);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const today = new Date(`${year}-${month + 1}-${date}`);
    // 오늘 전에 완료된 작업들을 추려낸다.
    const prevTodos = todos.filter((todo) => {
      if (!todo.startTime) return false;
      if (!todo.finishTime) return false;
      return today.getTime() - todo.startTime.getTime();
    });

    console.log(prevTodos);

    // 이전에 완료된 작업이 없으면 전날을 캘린더 초기 날짜로 세팅한다.
    if (prevTodos.length === 0) {
      setCalendar({
        ...calendar,
        date: new Date(`${year}-${month + 1}-${date - 1}`),
      });
    } else {
      const sortedArray = prevTodos.sort((a, b) => {
        if (a.startTime && b.startTime) {
          return b.startTime.getTime() - a.startTime.getTime();
        } else {
          return 0;
        }
      });
      const calendarDate = sortedArray[0].startTime;
      if (!calendarDate) return;
      setCalendar({ ...calendar, date: calendarDate });
    }
  }, []);

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
    // 컨텍스트 메뉴가 활성화되어 있고, 활성화된 메뉴가 타이틀의 옵션 버튼이라면
    if (
      contextualMenu.isActive &&
      contextualMenu.items[0] !== 'separator' &&
      contextualMenu.items[0].text === '목록 옵션'
    ) {
      setContextualMenu({ ...contextualMenu, isActive: false });
    } else {
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
    }
  };

  const handleToggleTimeline = (): void => {
    setConfig({ ...config, showTimeline: !config.showTimeline });
  };

  const handleCalendarClick = (posX: number, posY: number): void => {
    if (calendar.isActive) {
      setCalendar({ ...calendar, isActive: false });
    } else {
      setCalendar({ ...calendar, isActive: true, posX, posY });
    }
  };

  const handleClick = (): void => {
    if (contextualMenu.isActive) {
      setContextualMenu(contextualMenuDisable);
    }
    if (calendar.isActive) {
      setCalendar({ ...calendar, isActive: false });
    }
    if (!search.keyword) {
      handleDisableSearchMode();
    }
  };

  // 할 일 목록에 내려줄 todo
  let todolistTodo: TodoData[];

  // 검색모드가 활성화되어 있으면 검색결과에 맞는 todo를 내려줌
  if (search.isActive) {
    // 검색어가 빈 문자열인 경우 빈 배열 리턴
    if (!search.keyword) {
      todolistTodo = [];
    } else {
      todolistTodo = produce(todos, (draft) => {
        return draft.filter((todo) => {
          // search NOT cAsE sEnSiTiVe
          const todoText = todo.text.toLowerCase();
          const keyword = search.keyword.toLowerCase();
          return todoText.includes(keyword);
        });
      });
    }
  }
  // 검색모드가 비활성화 되어 있으면 사이드바 메뉴에 맞는 todo를 내려줌
  else {
    switch (sidebar.currentItem) {
      case 'today':
        // 끝나지 않았거나, 오늘 끝난 작업들
        todolistTodo = produce(todos, (draft) => {
          return draft.filter((todo) => {
            if (config.showTodayFinish) {
              return !todo.finishTime || isToday(todo.finishTime);
            } else {
              return !todo.finishTime;
            }
          });
        });
        break;
      case 'history':
        // 달력으로 선택된 날짜에 시작된 작업들
        const year = calendar.date.getFullYear();
        const month = calendar.date.getMonth();
        const date = calendar.date.getDate();
        todolistTodo = produce(todos, (draft) => {
          return draft.filter((todo) => {
            if (todo.startTime && todo.finishTime) {
              if (
                todo.startTime.getFullYear() === year &&
                todo.startTime.getMonth() === month &&
                todo.startTime.getDate() === date
              ) {
                return true;
              }
            }
            return false;
          });
        });
        break;
    }
  }

  // 타임라인에 내려줄 todo (RFT: 최적화 필요)
  let timelineTodo: TodoData[] = [];

  if (!search.isActive && sidebar.currentItem === 'today') {
    timelineTodo = todos.filter((todo) => {
      return todo.startTime && isToday(todo.startTime);
    });
  }

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
            calendar={calendar}
            currentItem={sidebar.currentItem}
            isTimelineActive={config.showTimeline}
            onTitleOptionsClick={handleTitleOptionsClick}
            onToggleTimeline={handleToggleTimeline}
            onCalendarClick={handleCalendarClick}
          />
          {config.showTimeline &&
          !search.isActive &&
          sidebar.currentItem === 'today' ? (
            <Timeline todos={timelineTodo} />
          ) : (
            <></>
          )}
          <TodoList
            todos={todolistTodo}
            isSearchActive={search.isActive}
            currentItem={sidebar.currentItem}
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
      <div
        className="calendar-wrapper"
        style={{
          display: calendar.isActive ? '' : 'none',
          left: calendar.posX,
          top: calendar.posY,
        }}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
      >
        <Calendar
          value={calendar.date}
          onChange={(value: Date | Date[]): void => {
            if (!Array.isArray(value)) {
              setCalendar({ ...calendar, date: value, isActive: false });
            }
          }}
        />
      </div>
    </div>
  );
};

export default App;
