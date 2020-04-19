import React from 'react';
import './TodoContextMenu.scss';

interface Props {
  id: number;
  active: boolean;
  posX: number;
  posY: number;
}

const TodoContextMenu = (props: Props): JSX.Element => {
  const { id, active, posX, posY } = props;

  return (
    <div
      className="TodoContextMenu"
      style={{ display: active ? '' : 'none', left: posX, top: posY }}
    >
      <div className="item">삭제</div>
    </div>
  );
};

export default TodoContextMenu;
