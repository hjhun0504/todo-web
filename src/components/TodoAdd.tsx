import React from 'react';
import './TodoAdd.scss';

const TodoAdd = (): JSX.Element => {
  return (
    <form className="TodoAdd">
      <input placeholder="할 일"></input>
      <input placeholder="예상 시간(분)" type="number"></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoAdd;
