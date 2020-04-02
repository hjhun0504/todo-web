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

  const [editmodeText, setEditmodeText] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>('');
  const [editmodeTime, setEditmodeTime] = useState<boolean>(false);
  const [editedTime, setEditedTime] = useState<string>('');
  const textRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();

  // 텍스트를 클릭하면 텍스트 편집모드 활성화
  const handleClickText = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    setEditedText(todo.text);
    setEditmodeText(true);
  };

  // 목표시간을 클릭하면 목표시간 편집모드 활성화
  const handleClickTime = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    setEditedTime(todo.targetTime.toString());
    setEditmodeTime(true);
  };

  // 수정 박스를 클릭했을 때
  const handleClickEditBox = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  // 수정 박스에서 키 입력이 있었을 때
  const handleEditBoxKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.keyCode === 13) {
      if (event.currentTarget.name === 'text') {
        if (editedText) {
          onEditTodoText(todo.id, editedText);
          setEditmodeText(false);
        }
      } else if (event.currentTarget.name === 'time') {
        const time = parseInt(editedTime);
        if (typeof time && time > 0) {
          onEditTodoTime(todo.id, time);
          setEditmodeTime(false);
        }
      }
    } else if (event.keyCode === 27) {
      if (event.currentTarget.name === 'text') {
        setEditmodeText(false);
      } else if (event.currentTarget.name === 'time') {
        setEditmodeTime(false);
      }
    }
  };

  // 투두 리스트(슬롯)을 클릭하면 편집모드 비활성화
  const handleClickSlot = (): void => {
    setEditmodeText(false);
    setEditmodeTime(false);
  };

  useEffect(() => {
    textRef.current?.focus();
  }, [textRef, editmodeText]);

  useEffect(() => {
    timeRef.current?.focus();
  }, [timeRef, editmodeTime]);

  return (
    <div className="TodoListItem" onClick={handleClickSlot}>
      <div className="content">
        <div
          className={cn('text', { invisible: editmodeText })}
          onClick={handleClickText}
        >
          {todo.text}
        </div>
        <div className={cn({ invisible: !editmodeText })}>
          <input
            name="text"
            className="text_edit"
            type="text"
            value={editedText}
            ref={textRef}
            onChange={(event): void => setEditedText(event.target.value)}
            onClick={handleClickEditBox}
            onKeyDown={handleEditBoxKeyDown}
          />
        </div>
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
            name="time"
            className="target_edit"
            type="text"
            maxLength={3}
            value={editedTime}
            ref={timeRef}
            onChange={(event): void => setEditedTime(event.target.value)}
            onClick={handleClickEditBox}
            onKeyDown={handleEditBoxKeyDown}
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
