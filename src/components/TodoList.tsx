import React from 'react';
import TodoListItem from './TodoListItem';

import './TodoList.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
  onStartTodo: (id: number) => void;
  onFinishTodo: (id: number) => void;
}

const TodoList = (props: Props): JSX.Element => {
  const {
    todos,
    onEditTodoText,
    onEditTodoTime,
    onStartTodo,
    onFinishTodo,
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
        />
      ))}
    </div>
  );
};

export default TodoList;
