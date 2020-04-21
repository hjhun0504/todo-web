import React from 'react';
import cn from 'classnames';
import SidebarItem from '@components/Sidebar/SidebarItem/SidebarItem';
import { SidebarData, SidebarItems } from '@interfaces/index';

import './Sidebar.scss';

interface Items {
  item: SidebarItems;
  text: string;
  isActive?: boolean;
}

const items: Items[] = [
  { item: 'today', text: '오늘' },
  { item: 'history', text: '기록' },
];

interface Props {
  sidebar: SidebarData;
  onChangeSidebarMenu: (item: SidebarItems) => void;
}

const Sidebar = (props: Props): JSX.Element => {
  const { sidebar, onChangeSidebarMenu } = props;

  return (
    <aside className={cn('Sidebar', { visible: sidebar.isActive })}>
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          item={item.item}
          text={item.text}
          isActive={sidebar.currentItem === item.item}
          onChangeSidebarMenu={onChangeSidebarMenu}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
