import React from 'react';
import './TodoContextMenu.scss';

import { FaRegTrashAlt } from 'react-icons/fa';

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
      <div className="item">
        <FaRegTrashAlt />
        <span>작업 삭제</span>
      </div>
    </div>
  );
};

export default TodoContextMenu;
