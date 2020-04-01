import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './TodoListItem.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todo: TodoData;
}

const TodoListItem = (props: Props): JSX.Element => {
  const { todo } = props;

  const [editTargetTime, setEditTargetTime] = useState(false);
  const [targetTime, setTargetTime] = useState(todo.targetTime);

  const targetTimeRef = React.createRef<HTMLInputElement>();

  const handleEditTargetTime = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    if (!editTargetTime) {
      setTargetTime(todo.targetTime);
    }
    setEditTargetTime(true);
  };

  const handleClickSlot = (): void => {
    setEditTargetTime(false);
  };

  useEffect(() => {
    targetTimeRef.current?.focus();
  }, [targetTimeRef, editTargetTime]);

  return (
    <div className="TodoListItem" onClick={handleClickSlot}>
      <div className="content">
        <div className="text">{todo.text}</div>
      </div>
      <div className="time">
        <div className="desc">목표시간(분)</div>
        <div
          className={cn('target', { invisible: editTargetTime })}
          onClick={handleEditTargetTime}
        >
          {todo.targetTime}
        </div>
        <div className={cn({ invisible: !editTargetTime })}>
          <input
            className="target_edit"
            type="text"
            maxLength={3}
            value={targetTime}
            ref={targetTimeRef}
            onChange={(event): void =>
              setTargetTime(Number(event.target.value))
            }
          />
        </div>
      </div>
      <div className="action">
        <button className="start">시작</button>
      </div>
    </div>
  );
};

export default TodoListItem;
