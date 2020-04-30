import React from 'react';
import produce from 'immer';
import cn from 'classnames';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { TodoData } from '@interfaces/index';

import './Timeline.scss';

const getHours = (time: Date): number => {
  return time.getHours() + time.getMinutes() / 60;
};

const getPosition = (
  startTime: Date,
  timelineStartTime: number,
  timelineEndTime: number,
): number => {
  const hours = getHours(startTime) - timelineStartTime;
  return (hours / (timelineEndTime - timelineStartTime)) * 100;
};

const getWidth = (
  startTime: Date,
  finishTime: Date,
  timelineStartTime: number,
  timelineEndTime: number,
): number => {
  const consumedTime = getHours(finishTime) - getHours(startTime);
  const width = (consumedTime / (timelineEndTime - timelineStartTime)) * 100;
  return width > 1 ? width : 1; // 최소 1%의 폭을 가진다.
};

interface Props {
  todos: TodoData[];
}

const Timeline = (props: Props): JSX.Element => {
  const { todos } = props;

  // 완료된 작업들을 시작한 시간순으로 오름차순으로 정렬한다.
  const sortedTodos = produce(todos, (draft) => {
    return draft.sort((a, b) => {
      if (a.startTime && b.startTime) {
        return b.startTime?.getTime() - a.startTime?.getTime();
      } else {
        return 0;
      }
    });
  });

  const currentHour = new Date().getHours() + 2;
  // const timelineStartTime =
  //   sortedTodos.length > 0
  //     ? sortedTodos[sortedTodos.length - 1].startTime?.getHours() || 0
  //     : 0;
  // const timelineEndTime = 24 > currentHour ? currentHour : 24;
  const timelineStartTime = 0;
  const timelineEndTime = 24;
  const timeRuler: JSX.Element[] = [];
  for (let i = timelineStartTime; i <= timelineEndTime; i++) {
    timeRuler.push(
      <div key={i} className="time">
        {i}
      </div>,
    );
  }

  return (
    <div className="Timeline">
      <div className="graph">
        {sortedTodos.map((todo, index) => {
          // 타임라인에 표시되는 모든 todo는 startTime을 가지고 있음 (타입체킹용)
          if (!todo.startTime) {
            return;
          }
          let objectTime;
          if (todo.finishTime) {
            objectTime = todo.finishTime;
          } else {
            objectTime = new Date(todo.startTime);
            objectTime.setMinutes(objectTime.getMinutes() + todo.targetMinutes);
          }

          const left = getPosition(
            todo.startTime,
            timelineStartTime,
            timelineEndTime,
          );

          const width = getWidth(
            todo.startTime,
            objectTime,
            timelineStartTime,
            timelineEndTime,
          );

          return (
            <div key={index}>
              <Tippy content={`${todo.text}`}>
                <div
                  className={cn('item', { done: todo.finishTime })}
                  style={{ left: `${left}%`, width: `${width}%` }}
                >
                  <div className="item-text">{todo.text}</div>
                </div>
              </Tippy>
            </div>
          );
        })}
        <div className="line"></div>
        <div className="timebox">{timeRuler.map((value) => value)}</div>
      </div>
    </div>
  );
};

export default Timeline;
