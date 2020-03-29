import React from 'react';
import './TodoListItem.scss';

const TodoListItem = (): JSX.Element => {
  const onStart = (): void => {
    console.log('start todo');
  };

  return (
    <div className="TodoListItem">
      <div className="content">
        <div className="text">React Study</div>
      </div>
      <div className="time">
        <div className="desc">목표시간(분)</div>
        <div className="target">90</div>
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
