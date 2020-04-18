import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { GoPlus } from 'react-icons/go';
import { MdClose } from 'react-icons/md';

import './TodoAdd.scss';

interface Props {
  onAddTodo: (text: string, targetTime: number) => void;
}

const TodoAdd = (props: Props): JSX.Element => {
  const [addMode, setAddMode] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [targetTime, setTargetTime] = useState<string>('');
  const [timeTooltip, setTimeTooltip] = useState<boolean>(false);
  const { onAddTodo } = props;
  let textRef: HTMLInputElement | null = null;
  let timeRef: HTMLInputElement | null = null;

  const resetForm = (): void => {
    setText('');
    setTargetTime('');
    setTimeTooltip(false);
  };

  const disableAddMode = (): void => {
    setAddMode(false);
    resetForm();
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();

    if (text && targetTime) {
      const parsedTime = parseInt(targetTime);
      if (parsedTime && parsedTime > 0) {
        onAddTodo(text, Number(targetTime));
        resetForm();
        textRef?.focus();
      } else {
        setTimeTooltip(true);
      }
    }
  };

  const handleOnChange = (
    dispatch: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(event.target.value);
    };
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    // Enter가 입력되었을 때, text 인풋이고 내용이 있으면 time 인풋을 포커스한다.
    if (event.keyCode === 13 && event.currentTarget.name === 'text') {
      if (text) {
        timeRef?.focus();
      }
    }
    // Esc가 입력되면 addMode를 비활성화 한다.
    else if (event.keyCode === 27) {
      disableAddMode();
    }
  };

  // 편집모드로 전환시 text box 포커스
  useEffect((): void => {
    if (addMode) {
      textRef?.focus();
    }
  }, [addMode, textRef]);

  if (!addMode) {
    return (
      <div className="TodoAdd">
        <div className="add-button" onClick={(): void => setAddMode(true)}>
          <GoPlus className="add-icon" />
          <div>할 일 추가</div>
        </div>
      </div>
    );
  }

  return (
    <div className="TodoAdd">
      <form className="add-form">
        <div className="todo-input">
          <input
            className="text edit-box"
            name="text"
            type="text"
            value={text}
            placeholder="할 일"
            ref={(input): void => {
              textRef = input;
            }}
            onChange={handleOnChange(setText)}
            onKeyDown={handleKeyDown}
          ></input>
          <Tippy
            visible={timeTooltip}
            onClickOutside={(): void => setTimeTooltip(false)}
            content="목표시간을 숫자로 입력해주세요!"
          >
            <input
              className="time edit-box"
              type="text"
              value={targetTime}
              onChange={handleOnChange(setTargetTime)}
              placeholder="목표시간(분)"
              ref={(input): void => {
                timeRef = input;
              }}
              maxLength={3}
              onKeyDown={handleKeyDown}
            ></input>
          </Tippy>
        </div>
        <div className="form-action">
          <button
            className="submit"
            type="submit"
            disabled={Boolean(!text) || Boolean(!targetTime)}
            onClick={handleSubmit}
          >
            할 일 추가
          </button>
          <MdClose className="close-icon" onClick={disableAddMode} />
        </div>
      </form>
    </div>
  );
};

export default TodoAdd;
