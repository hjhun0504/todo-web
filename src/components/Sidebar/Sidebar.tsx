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
    <aside
      className={cn(
        'Sidebar',
        {
          visible:
            (sidebar.isActive &&
              document.documentElement.className !== 'overlaid') ||
            sidebar.isOverlaidActive, // 가로폭이 좁을때 사이드바를 켜두었으면 표시한다.
        },
        {
          overlaid:
            sidebar.isOverlaidActive &&
            document.documentElement.className === 'overlaid',
        }, // 가로폭이 좁을때 사이드바가 켜져있으면 overlaid 하게 사이드바를 스타일링한다.
      )}
    >
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
