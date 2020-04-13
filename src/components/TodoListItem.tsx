import React, { useState } from 'react';
import './TodoListItem.scss';

import ProgressBar from '@components/ProgressBar/ProgressBar';

import { TodoData } from '@interfaces/index';

interface Props {
  todo: TodoData;
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
  onStartTodo: (id: number) => void;
  onFinishTodo: (id: number) => void;
}

const getElapsedMinute = (startTime: number, finishTime: number): string => {
  const elapsedMinute = Math.floor((finishTime - startTime) / (1000 * 60));
  if (elapsedMinute > 1) {
    return elapsedMinute.toString();
  } else {
    return '1';
  }
};

let isEsc = false;

const TodoListItem = (props: Props): JSX.Element => {
  const {
    todo,
    onEditTodoText,
    onEditTodoTime,
    onStartTodo,
    onFinishTodo,
  } = props;

  const [text, setText] = useState<string>(todo.text);
  const [time, setTime] = useState<string>(todo.targetMinutes.toString());
  const textRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();

  // 입력된 time 값을 정수로 변환했을때 0보다 큰 값이면 저장하고, 아니면 이전 값으로 돌린다.
  const validateTimeAndSave = (): void => {
    const parsedTime = parseInt(time);
    if (parsedTime && parsedTime > 0) {
      setTime(parsedTime.toString());
      onEditTodoTime(todo.id, parsedTime);
    } else {
      setTime(todo.targetMinutes.toString());
    }
  };

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
        validateTimeAndSave();
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
        setTime(todo.targetMinutes.toString());
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
        validateTimeAndSave();
      }
    }

    isEsc = false;
  };

  // 프로그레스 바
  let progressBar = <></>;
  if (todo.startTime && !todo.finishTime) {
    // 목표시간 계산
    const targetTime = new Date(
      todo.startTime.getTime() + todo.targetMinutes * 1000 * 60,
    );
    progressBar = (
      <ProgressBar
        targetTime={targetTime}
        targetSeconds={todo.targetMinutes * 60}
      />
    );
  }

  // 목표시간
  let timeColumn;
  if (!todo.finishTime) {
    timeColumn = (
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
    );
  } else {
    timeColumn = (
      <div className="time column">
        <div className="desc">목표시간(분)</div>
        <div className="time-text">{todo.targetMinutes}</div>
      </div>
    );
  }

  // 맨 오른쪽 메뉴
  let rightmostColumn;
  if (!todo.startTime) {
    rightmostColumn = (
      <div className="action column">
        <button className="start" onClick={(): void => onStartTodo(todo.id)}>
          시작
        </button>
      </div>
    );
  } else {
    if (!todo.finishTime) {
      rightmostColumn = (
        <div className="action column">
          <button className="end" onClick={(): void => onFinishTodo(todo.id)}>
            종료
          </button>
        </div>
      );
    } else {
      rightmostColumn = (
        <div className="time column">
          <div className="desc">완료시간(분)</div>
          <div className="time-text">
            {getElapsedMinute(
              todo.startTime.getTime(),
              todo.finishTime.getTime(),
            )}
          </div>
        </div>
      );
    }
  }

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
        {progressBar}
      </div>
      {timeColumn}
      {rightmostColumn}
    </div>
  );
};

export default TodoListItem;
