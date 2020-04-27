import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TodoListItem from '@components/TodoList/TodoListItem/TodoListItem';
import TodoAdd from '@components/TodoList/TodoAdd/TodoAdd';
import { TodoData, SidebarItems } from '@interfaces/index';

import './TodoList.scss';

interface Props {
  todos: TodoData[];
  isSearchActive: boolean;
  currentItem: SidebarItems;
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
    isSearchActive,
    todos,
    currentItem,
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

  return (
    <div className="TodoList">
      <DragDropContext
        onDragStart={(): void => onCloseContextMenu()}
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId="todo">
          {(provided): JSX.Element => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo) => (
                <TodoListItem
                  key={todo.id}
                  index={todo.id}
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
      </DragDropContext>
      {!isSearchActive && currentItem === 'today' ? (
        <TodoAdd onAddTodo={onAddTodo} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodoList;
