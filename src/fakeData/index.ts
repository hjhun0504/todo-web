import { TodoData } from '@interfaces/index';

export const todoDummy: TodoData[] = [
  {
    id: 0,
    text: '오른쪽 시작 버튼을 눌러 작업을 시작하세요.',
    targetMinutes: 5,
  },
  {
    id: 1,
    text: '할 일이나 목표 시간을 클릭해 변경할 수 있습니다.',
    targetMinutes: 5,
  },
  { id: 2, text: '작업을 드래그해서 순서를 바꿔보세요.', targetMinutes: 30 },
  { id: 3, text: '작업 삭제는 우클릭으로 할 수 있습니다!', targetMinutes: 10 },
  {
    id: 4,
    text: '완료된 작업입니다.',
    targetMinutes: 45,
    startTime: new Date(Date.now() - 3500000),
    finishTime: new Date(Date.now()),
  },
  {
    id: 5,
    text: '4월 23일 완료된 작업',
    targetMinutes: 20,
    startTime: new Date('2020-04-23T23:30:00'),
    finishTime: new Date('2020-04-23T23:40:00'),
  },
  {
    id: 6,
    text: '4월 22일 완료된 작업',
    targetMinutes: 20,
    startTime: new Date('2020-04-22T23:30:00'),
    finishTime: new Date('2020-04-22T23:40:00'),
  },
  // { id: 6, text: '운동하기', targetMinutes: 20 },
  // { id: 7, text: '운동하기', targetMinutes: 20 },
  // { id: 8, text: '운동하기', targetMinutes: 20 },
  // { id: 9, text: '운동하기', targetMinutes: 20 },
  // { id: 10, text: '운동하기', targetMinutes: 20 },
  // {
  //   id: 11,
  //   text:
  //     'Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time.',
  //   targetMinutes: 20,
  // },
];

const today = new Date();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');

export const todoDummy2: TodoData[] = [
  {
    id: 0,
    text: 'Task 1',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T07:25:00`),
    finishTime: new Date(`2020-${month}-${date}T08:45:00`),
  },
  {
    id: 1,
    text: 'Task 2',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T09:06:00`),
    finishTime: new Date(`2020-${month}-${date}T11:45:00`),
  },
  {
    id: 2,
    text: 'Task 3',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T12:30:00`),
    finishTime: new Date(`2020-${month}-${date}T13:45:00`),
  },
  {
    id: 3,
    text: 'Task 4',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T14:55:00`),
    finishTime: new Date(`2020-${month}-${date}T15:00:00`),
  },
  {
    id: 4,
    text: 'Task 5',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T16:47:00`),
    finishTime: new Date(`2020-${month}-${date}T17:19:00`),
  },
  {
    id: 5,
    text: 'Task 6',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T19:35:00`),
    finishTime: new Date(`2020-${month}-${date}T20:45:00`),
  },
  {
    id: 6,
    text: 'Task 7',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T21:02:00`),
    finishTime: new Date(`2020-${month}-${date}T23:45:00`),
  },
  {
    id: 7,
    text: 'Task 8',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T21:02:00`),
    finishTime: new Date(`2020-${month}-${date}T23:45:00`),
  },

  {
    id: 8,
    text: 'Task 9',
    targetMinutes: 10,
    startTime: new Date(`2020-${month}-${date}T21:02:00`),
    finishTime: new Date(`2020-${month}-${date}T23:45:00`),
  },
  {
    id: 9,
    text: '과거 완료',
    targetMinutes: 10,
    startTime: new Date(`2020-04-20T06:25:00`),
    finishTime: new Date(`2020-04-20T08:45:00`),
  },
  {
    id: 10,
    text: '과거 완료2',
    targetMinutes: 10,
    startTime: new Date(`2020-04-20T06:25:00`),
    finishTime: new Date(`2020-04-20T08:45:00`),
  },
];
