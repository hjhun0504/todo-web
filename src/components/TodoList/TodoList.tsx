import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import produce from 'immer';
import TodoListItem from '@components/TodoList/TodoListItem/TodoListItem';
import TodoAdd from '@components/TodoList/TodoAdd/TodoAdd';

import { TodoData, SidebarItems } from '@interfaces/index';

import './TodoList.scss';

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

interface Props {
  currentItem: SidebarItems;
  todos: TodoData[];
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
  onStartTodo: (id: number) => void;
  onFinishTodo: (id: number) => void;
  onAddTodo: (text: string, targetTime: number) => void;
  onReorderTodo: (sourceIndex: number, destinationIndex: number) => void;
  onContextMenu: (id: number, posX: number, posY: number) => void;
  onCloseContextMenu: () => void;
}

const TodoList = (props: Props): JSX.Element => {
  const {
    currentItem,
    todos,
    onEditTodoText,
    onEditTodoTime,
    onStartTodo,
    onFinishTodo,
    onAddTodo,
    onReorderTodo,
    onContextMenu,
    onCloseContextMenu,
  } = props;

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    onReorderTodo(source.index, destination.index);
  };

  let currentTodos: TodoData[];

  switch (currentItem) {
    case 'today':
      // 끝나지 않았거나, 오늘 끝난 작업들
      currentTodos = produce(todos, (draft) => {
        return draft.filter((todo) => {
          return !todo.finishTime || isToday(todo.finishTime);
        });
      });
      break;
    case 'history':
      // 완료된 작업들 (오늘 완료된 작업은 제외)
      currentTodos = produce(todos, (draft) => {
        return draft.filter((todo) => {
          return todo.finishTime && !isToday(todo.finishTime);
        });
      });
      break;
  }

  return (
    <DragDropContext
      onDragStart={(): void => onCloseContextMenu()}
      onDragEnd={handleDragEnd}
    >
      <div className="TodoList">
        <Droppable droppableId="todo">
          {(provided): JSX.Element => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {currentTodos.map((todo, index) => (
                <TodoListItem
                  key={todo.id}
                  index={index}
                  todo={todo}
                  onEditTodoText={onEditTodoText}
                  onEditTodoTime={onEditTodoTime}
                  onStartTodo={onStartTodo}
                  onFinishTodo={onFinishTodo}
                  onContextMenu={onContextMenu}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <TodoAdd onAddTodo={onAddTodo} />
      </div>
    </DragDropContext>
  );
};

export default TodoList;
