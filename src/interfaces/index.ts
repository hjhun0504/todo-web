export interface TodoData {
  id: number;
  text: string;
  targetMinutes: number;
  startTime?: Date;
  finishTime?: Date;
}
