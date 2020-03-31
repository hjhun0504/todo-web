import React from 'react';
import './TodoListItem.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todo: TodoData;
}

const TodoListItem = (props: Props): JSX.Element => {
  const { todo } = props;

  const onStart = (): void => {
    console.log('start todo');
  };

  return (
    <div className="TodoListItem">
      <div className="content">
        <div className="text">{todo.text}</div>
      </div>
      <div className="time">
        <div className="desc">목표시간(분)</div>
        <div className="target">{todo.targetTime}</div>
      </div>
      <div className="action">
        <button className="start" onClick={onStart}>
          시작
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
