import React from 'react';
import SidebarItem from '@components/Sidebar/SidebarItem/SidebarItem';
import { SidebarItems } from '@interfaces/index';

import './Sidebar.scss';

interface Items {
  type: SidebarItems;
  text: string;
  isActive?: boolean;
}

const items: Items[] = [
  { type: 'today', text: '오늘' },
  { type: 'history', text: '기록' },
];

interface Props {
  currentMenu: SidebarItems;
  onChangeSidebarMenu: (menu: SidebarItems) => void;
}

const Sidebar = (props: Props): JSX.Element => {
  const { currentMenu, onChangeSidebarMenu } = props;

  return (
    <aside className="Sidebar">
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          item={item.type}
          text={item.text}
          isActive={currentMenu === item.type}
          onChangeSidebarMenu={onChangeSidebarMenu}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
