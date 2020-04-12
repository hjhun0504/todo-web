export interface TodoData {
  id: number;
  text: string;
  targetTime: number;
  startTime?: Date;
  finishTime?: Date;
}
