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
}
