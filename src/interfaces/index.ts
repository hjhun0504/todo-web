export interface TodoData {
  id: number;
  text: string;
  targetMinutes: number;
  startTime?: Date;
  finishTime?: Date;
}

export type SidebarItems = 'today' | 'history';

export interface SidebarData {
  currentItem: SidebarItems;
  isActive: boolean;
  isOverlaidActive: boolean;
}

export type ContextualMenuItem = ContextualMenuItemData | 'separator';

export type ContextualMenuItemIcon = 'delete';

interface ContextualMenuItemData {
  icon: ContextualMenuItemIcon;
  text: string;
  onClick: () => void;
}
