import React, { useState } from 'react';
import './TodoListItem.scss';

import ProgressBar from '@components/ProgressBar/ProgressBar';

import { TodoData } from '@interfaces/index';

interface Props {
  todo: TodoData;
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
}

let isEsc = false;

const TodoListItem = (props: Props): JSX.Element => {
  const { todo, onEditTodoText, onEditTodoTime } = props;

  const [text, setText] = useState<string>(todo.text);
  const [time, setTime] = useState<string>(todo.targetTime.toString());
  const textRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    // Enter가 입력되면 저장한다.
    if (event.keyCode === 13) {
      // 텍스트인 경우
      if (event.currentTarget.name === 'text') {
        onEditTodoText(todo.id, text);
        textRef.current?.blur();
      }
      // 목표시간인 경우
      else if (event.currentTarget.name === 'time') {
        const parsedTime = parseInt(time);
        if (parsedTime && parsedTime > 0) {
          setTime(parsedTime.toString());
          onEditTodoTime(todo.id, parsedTime);
        } else {
          setTime(todo.targetTime.toString());
        }
        timeRef.current?.blur();
      }
    }
    // Esc가 입력되면 수정중이던 내용을 버린다.
    else if (event.keyCode === 27) {
      isEsc = true;
      if (event.currentTarget.name === 'text') {
        setText(todo.text);
        textRef.current?.blur();
      } else if (event.currentTarget.name === 'time') {
        setTime(todo.targetTime.toString());
        timeRef.current?.blur();
      }
    }
  };

  // Focus out이 되면 저장한다. Esc키로 인해 발생했으면 저장하지 않는다.
  const handleFocusOut = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (!isEsc) {
      if (event.currentTarget.name === 'text') {
        onEditTodoText(todo.id, text);
      } else if (event.currentTarget.name === 'time') {
        onEditTodoTime(todo.id, Number(time));
      }
    }
    isEsc = false;
  };

  return (
    <div className="TodoListItem">
      <div className="content column">
        <div className="text">
          <input
            name="text"
            className="text edit-box"
            type="text"
            value={text}
            ref={textRef}
            onChange={(event): void => setText(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleFocusOut}
          />
        </div>
        <ProgressBar percent={30} />
      </div>
      <div className="time column">
        <div className="desc">목표시간(분)</div>
        <div>
          <input
            name="time"
            className="target edit-box"
            type="text"
            maxLength={3}
            value={time}
            ref={timeRef}
            onChange={(event): void => setTime(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleFocusOut}
          />
        </div>
      </div>
      <div className="action column">
        <button className="start">시작</button>
      </div>
    </div>
  );
};

export default TodoListItem;
