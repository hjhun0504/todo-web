import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ContextualMenuItem, ContextualMenuItemIcon } from '@interfaces/index';

import './ContextualMenu.scss';

interface Props {
  isActive: boolean;
  items: ContextualMenuItem[];
  posX: number;
  posY: number;
}

const getIconElement = (icon: ContextualMenuItemIcon): JSX.Element => {
  switch (icon) {
    case 'delete':
      return <FaRegTrashAlt />;
  }
};

const ContextualMenu = (props: Props): JSX.Element => {
  const { isActive, items, posX, posY } = props;

  return (
    <div
      className="ContextualMenu"
      style={{ display: isActive ? '' : 'none', left: posX, top: posY }}
    >
      {items.map((item, index) => {
        if (typeof item === 'object') {
          return (
            <div key={index} className="item" onClick={item.onClick}>
              {getIconElement(item.icon)}
              <span>{item.text}</span>
            </div>
          );
        } else if (item === 'separator') {
          return <div key={index} className="separator"></div>;
        }

        console.warn('unexpected data type');
        return <></>;
      })}
    </div>
  );
};

export default ContextualMenu;
