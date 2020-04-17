import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
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

  if (!addMode) {
    return (
      <div className="TodoAdd">
        <div className="add-button" onClick={(): void => setAddMode(true)}>
          <AiOutlinePlus />
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
          <MdClose className="close" onClick={(): void => setAddMode(false)} />
        </div>
      </form>
    </div>
  );
};

export default TodoAdd;
