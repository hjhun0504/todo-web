import React from 'react';
import TodoListItem from './TodoListItem';

import { TodoData } from '@interfaces/index';

interface Props {
  todos: TodoData[];
}

const TodoList = (props: Props): JSX.Element => {
  const { todos } = props;

  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
