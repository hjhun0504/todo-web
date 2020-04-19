import React from 'react';
import './SidebarItem.scss';

import { FaRegCalendar, FaHistory } from 'react-icons/fa';

interface Props {
  icon: 'today' | 'history';
  text: string;
}

const SidebarItem = (props: Props): JSX.Element => {
  const { icon, text } = props;
  let svgIcon;
  switch (icon) {
    case 'today':
      svgIcon = <FaRegCalendar />;
      break;
    case 'history':
      svgIcon = <FaHistory />;
      break;
  }

  return (
    <div className="SidebarItem">
      {svgIcon}
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;
