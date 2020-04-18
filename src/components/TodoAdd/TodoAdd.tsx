import React, { useState, useEffect } from 'react';
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
  const { onAddTodo } = props;
  let textRef: HTMLInputElement | null = null;

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();

    if (text && targetTime) {
      onAddTodo(text, Number(targetTime));
      setText('');
      setTargetTime('');
    }
  };

  const handleOnChange = (
    dispatch: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(event.target.value);
    };
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
            type="text"
            value={text}
            onChange={handleOnChange(setText)}
            placeholder="할 일"
            ref={(input): void => {
              textRef = input;
            }}
          ></input>
          <input
            className="time edit-box"
            type="text"
            value={targetTime}
            onChange={handleOnChange(setTargetTime)}
            placeholder="목표시간(분)"
          ></input>
        </div>
        <div className="form-action">
          <button className="submit" type="submit" onClick={handleSubmit}>
            할 일 추가
          </button>
          <MdClose
            className="close-icon"
            onClick={(): void => setAddMode(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default TodoAdd;
