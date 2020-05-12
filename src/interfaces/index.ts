// 할 일(작업)
export interface TodoData {
  id: number;
  text: string;
  targetMinutes: number;
  startTime?: Date;
  finishTime?: Date;
}

// 사이드바
export type SidebarItems = 'today' | 'history' | 'stats';

export interface SidebarData {
  currentItem: SidebarItems;
  isActive: boolean;
  isOverlaidActive: boolean;
}

// 컨텍스트 메뉴
export type ContextualMenuItem = ContextualMenuItemData | 'separator';

export type ContextualMenuItemIcon = 'delete' | 'check';

interface ContextualMenuItemData {
  isTitle: boolean;
  text: string;
  icon?: ContextualMenuItemIcon;
  onClick?: () => void;
}

// 설정
export interface ConfigData {
  showTodayFinish: boolean;
  showTimeline: boolean;
}

// 검색
export interface SearchData {
  isActive: boolean;
  keyword: string;
}

// 통계 데이터
export interface StatsData {
  [key: string]: Record<string, number>;
}

// 캘린더
export interface CalendarData {
  isActive: boolean;
  date: Date;
  posX: number;
  posY: number;
}
