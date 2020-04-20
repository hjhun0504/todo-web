import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TodoListItem from '@components/TodoList/TodoListItem/TodoListItem';
import TodoAdd from '@components/TodoList/TodoAdd/TodoAdd';

import './TodoList.scss';
import { TodoData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
  onStartTodo: (id: number) => void;
  onFinishTodo: (id: number) => void;
  onAddTodo: (text: string, targetTime: number) => void;
  onReorderTodo: (sourceIndex: number, destinationIndex: number) => void;
  onContextMenu: (id: number, posX: number, posY: number) => void;
}

const TodoList = (props: Props): JSX.Element => {
  const {
    todos,
    onEditTodoText,
    onEditTodoTime,
    onStartTodo,
    onFinishTodo,
    onAddTodo,
    onReorderTodo,
    onContextMenu,
  } = props;

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    onReorderTodo(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="TodoList">
        <Droppable droppableId="todo">
          {(provided): JSX.Element => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
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
