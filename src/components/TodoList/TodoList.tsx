import React from 'react';
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
    onContextMenu,
  } = props;

  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onEditTodoText={onEditTodoText}
          onEditTodoTime={onEditTodoTime}
          onStartTodo={onStartTodo}
          onFinishTodo={onFinishTodo}
          onContextMenu={onContextMenu}
        />
      ))}
      <TodoAdd onAddTodo={onAddTodo} />
    </div>
  );
};

export default TodoList;
