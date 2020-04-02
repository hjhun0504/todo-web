import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './TodoListItem.scss';

import { TodoData } from '@interfaces/index';

interface Props {
  todo: TodoData;
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
}

const TodoListItem = (props: Props): JSX.Element => {
  const { todo, onEditTodoText, onEditTodoTime } = props;

  const [editmodeTime, setEditmodeTime] = useState<boolean>(false);
  const [editedTime, setEditedTime] = useState<string>('');
  const timeRef = React.createRef<HTMLInputElement>();

  // 목표시간을 클릭하면 목표시간 편집모드 활성화
  const handleClickTime = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    setEditedTime(todo.targetTime.toString());
    setEditmodeTime(true);
  };

  // 목표시간 수정 박스를 클릭했을 때
  const handleClickEditTime = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  // 목표시간 수정 박스에서 키 입력이 있었을 때
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    switch (event.keyCode) {
      case 13: // enter
        const time = parseInt(editedTime);
        if (typeof time && time > 0) {
          onEditTodoTime(todo.id, time);
          setEditmodeTime(false);
        }
        break;
      case 27: // esc
        setEditmodeTime(false);
        break;
    }
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
            value={editedTime}
            ref={timeRef}
            onChange={(event): void => setEditedTime(event.target.value)}
            onClick={handleClickEditTime}
            onKeyDown={handleKeyDown}
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
