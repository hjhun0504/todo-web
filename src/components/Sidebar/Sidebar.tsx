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
  { item: 'stats', text: '통계' },
];

interface Props {
  isSearchMode: boolean;
  sidebar: SidebarData;
  onChangeSidebarMenu: (item: SidebarItems) => void;
}

const Sidebar = (props: Props): JSX.Element => {
  const { isSearchMode, sidebar, onChangeSidebarMenu } = props;
  const overlaid =
    document.documentElement.className === 'overlaid' ? true : false;

  return (
    <aside
      className={cn(
        'Sidebar',
        {
          visible: (sidebar.isActive && !overlaid) || sidebar.isOverlaidActive, // 가로폭이 좁을때 사이드바를 켜두었으면 표시한다.
        },
        {
          overlaid,
        },
        {
          hide: !sidebar.isOverlaidActive,
        },
      )}
    >
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          item={item.item}
          text={item.text}
          isActive={sidebar.currentItem === item.item && !isSearchMode}
          onChangeSidebarMenu={onChangeSidebarMenu}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
