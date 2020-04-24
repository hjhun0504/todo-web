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
    startTime: new Date(),
    finishTime: new Date(Date.now() + 350000),
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
