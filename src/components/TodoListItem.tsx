import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './TodoListItem.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todo: TodoData;
}

const TodoListItem = (props: Props): JSX.Element => {
  const { todo } = props;

  const [time, setTime] = useState<string>('');
  const [editmodeTime, setEditmodeTime] = useState<boolean>(false);
  const timeRef = React.createRef<HTMLInputElement>();

  // 목표시간을 클릭하면 목표시간 편집모드 활성화
  const handleClickTime = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    setTime(todo.targetTime.toString());
    setEditmodeTime(true);
  };

  // 투두 리스트(슬롯)을 클릭하면 목표시간 편집모드 비활성화
  const handleClickSlot = (): void => {
    setEditmodeTime(false);
  };

  useEffect(() => {
    timeRef.current?.focus();
  }, [timeRef, editmodeTime]);

  return (
    <div className="TodoListItem" onClick={handleClickSlot}>
      <div className="content">
        <div className="text">{todo.text}</div>
      </div>
      <div className="time">
        <div className="desc">목표시간(분)</div>
        <div
          className={cn('target', { invisible: editmodeTime })}
          onClick={handleClickTime}
        >
          {todo.targetTime}
        </div>
        <div className={cn({ invisible: !editmodeTime })}>
          <input
            className="target_edit"
            type="text"
            maxLength={3}
            value={time}
            ref={timeRef}
            onChange={(event): void => setTime(event.target.value)}
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
