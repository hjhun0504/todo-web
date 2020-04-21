import React from 'react';
import cn from 'classnames';
import { SidebarItems } from '@interfaces/index';

import './SidebarItem.scss';
import { FaRegCalendar, FaHistory } from 'react-icons/fa';

const getIcon = (type: SidebarItems): JSX.Element => {
  switch (type) {
    case 'today':
      return <FaRegCalendar />;
    case 'history':
      return <FaHistory />;
  }
};

interface Props {
  type: SidebarItems;
  text: string;
  isActive: boolean;
  onChangeSidebarMenu: (menu: SidebarItems) => void;
}

const SidebarItem = (props: Props): JSX.Element => {
  const { type, text, isActive, onChangeSidebarMenu } = props;

  return (
    <div
      className={cn('SidebarItem', { active: isActive })}
      onClick={(): void => onChangeSidebarMenu(type)}
    >
      {getIcon(type)}
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;
