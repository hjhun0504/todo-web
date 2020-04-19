import React from 'react';
import SidebarItem from '@components/Sidebar/SidebarItem/SidebarItem';

import './Sidebar.scss';

const Sidebar = (): JSX.Element => {
  return (
    <aside className="Sidebar">
      <SidebarItem icon="today" text="오늘" />
      <SidebarItem icon="history" text="기록" />
    </aside>
  );
};

export default Sidebar;
