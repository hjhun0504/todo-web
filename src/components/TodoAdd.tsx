import React, { useState } from 'react';
import './TodoAdd.scss';

interface Props {
  onAddTodo: (text: string, targetTime: number) => void;
}

const TodoAdd = (props: Props): JSX.Element => {
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

  return (
    <form className="TodoAdd">
      <input
        type="text"
        value={text}
        onChange={handleOnChange(setText)}
        placeholder="할 일"
      ></input>
      <input
        type="number"
        value={targetTime}
        onChange={handleOnChange(setTargetTime)}
        placeholder="예상 시간(분)"
      ></input>
      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};

export default TodoAdd;
