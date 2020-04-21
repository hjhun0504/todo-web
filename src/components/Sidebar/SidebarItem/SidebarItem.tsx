import React from 'react';
import cn from 'classnames';
import { SidebarItems } from '@interfaces/index';

import './SidebarItem.scss';
import { FaRegCalendar, FaHistory } from 'react-icons/fa';

interface Props {
  item: SidebarItems;
  text: string;
  isActive: boolean;
  onChangeSidebarMenu: (menu: SidebarItems) => void;
}

const SidebarItem = (props: Props): JSX.Element => {
  const { item, text, isActive, onChangeSidebarMenu } = props;
  let svgIcon;
  switch (item) {
    case 'today':
      svgIcon = <FaRegCalendar />;
      break;
    case 'history':
      svgIcon = <FaHistory />;
      break;
  }

  return (
    <div
      className={cn('SidebarItem', { active: isActive })}
      onClick={(): void => onChangeSidebarMenu(item)}
    >
      {svgIcon}
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;
