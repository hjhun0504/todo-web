import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = (): JSX.Element => {
  return (
    <div>
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
};

export default TodoList;
