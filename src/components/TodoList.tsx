import React from 'react';
import TodoListItem from './TodoListItem';

import { TodoData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
}

const TodoList = (props: Props): JSX.Element => {
  const { todos, onEditTodoText, onEditTodoTime } = props;

  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onEditTodoText={onEditTodoText}
          onEditTodoTime={onEditTodoTime}
        />
      ))}
    </div>
  );
};

export default TodoList;
