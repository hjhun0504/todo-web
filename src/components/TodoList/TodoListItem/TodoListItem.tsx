import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import cn from 'classnames';

import './TodoListItem.scss';
import { TodoData } from '@interfaces/index';

// time column maker
enum TimeType {
  target = '목표',
  actual = '완료',
}

const timeColumnMaker = (
  desc: TimeType,
  content: number | JSX.Element,
): JSX.Element => {
  return (
    <div className="time column">
      <div className="desc">{desc}시간(분)</div>
      <div className="time-text">{content}</div>
    </div>
  );
};

// action column maker
enum ActionType {
  start = 'start',
  finish = 'finish',
}

const actionColumnMaker = (
  type: ActionType,
  text: string,
  onClick: () => void,
): JSX.Element => {
  return (
    <div className="action column">
      <button className={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

// 실제 걸린시간(분) 계산하는 함수
const getElapsedMinutes = (startTime: Date, finishTime: Date): number => {
  const elapsedMs = finishTime.getTime() - startTime.getTime();
  const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
  if (elapsedMinutes >= 1) {
    return elapsedMinutes;
  } else {
    return 1;
  }
};

// esc키가 눌렸는지 체크하는 변수
let isEsc = false;

interface Props {
  index: number;
  todo: TodoData;
  onEditTodoText: (id: number, editedText: string) => void;
  onEditTodoTime: (id: number, editedTime: number) => void;
  onStartTodo: (id: number) => void;
  onFinishTodo: (id: number) => void;
  onContextMenu: (id: number, posX: number, posY: number) => void;
}

const TodoListItem = (props: Props): JSX.Element => {
  const {
    index,
    todo,
    onEditTodoText,
    onEditTodoTime,
    onStartTodo,
    onFinishTodo,
    onContextMenu,
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

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    onContextMenu(todo.id, event.clientX, event.clientY);
    textRef.current?.blur();
    timeRef.current?.blur();
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
  let timeColumn = <></>;
  if (!todo.finishTime) {
    timeColumn = timeColumnMaker(
      TimeType.target,
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
      />,
    );
  } else {
    timeColumn = timeColumnMaker(TimeType.target, todo.targetMinutes);
  }

  // 맨 오른쪽 메뉴
  let rightmostColumn = <></>;
  if (!todo.startTime) {
    rightmostColumn = actionColumnMaker(ActionType.start, '시작', (): void =>
      onStartTodo(todo.id),
    );
  } else {
    if (!todo.finishTime) {
      rightmostColumn = actionColumnMaker(ActionType.finish, '종료', (): void =>
        onFinishTodo(todo.id),
      );
    } else {
      const elapsedMinute = getElapsedMinutes(todo.startTime, todo.finishTime);
      rightmostColumn = timeColumnMaker(TimeType.actual, elapsedMinute);
    }
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided): JSX.Element => (
        <div
          className="TodoListItem"
          onContextMenu={handleContextMenu}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="content column">
            <input
              name="text"
              className={cn('text', 'edit-box', { finish: todo.finishTime })}
              type="text"
              value={text}
              ref={textRef}
              onChange={(event): void => setText(event.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleFocusOut}
            />
            {progressBar}
          </div>
          {timeColumn}
          {rightmostColumn}
        </div>
      )}
    </Draggable>
  );
};

export default TodoListItem;
