export interface TodoData {
  id: number;
  text: string;
  targetTime: Date;
  startTime?: Date;
  finishTime?: Date;
}
