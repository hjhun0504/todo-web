import React, { useEffect, useState } from 'react';
import produce from 'immer';
import cn from 'classnames';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { TodoData } from '@interfaces/index';

import './Timeline.scss';

const getHours = (time: Date): number => {
  return time.getHours() + time.getMinutes() / 60;
};

const getAdjustedSize = (originalSize: number): number => {
  const minimumSize = 1;
  if (originalSize > minimumSize) {
    return originalSize;
  } else {
    return minimumSize;
  }
};

interface Props {
  todos: TodoData[];
}

const Timeline = (props: Props): JSX.Element => {
  const { todos } = props;
  const [tasks, setTasks] = useState<(JSX.Element | undefined)[]>([]);

  // const currentHour = new Date().getHours() + 2;
  // const timelineStartTime =
  //   sortedTodos.length > 0
  //     ? sortedTodos[sortedTodos.length - 1].startTime?.getHours() || 0
  //     : 0;
  // const timelineEndTime = 24 > currentHour ? currentHour : 24;
  const timelineStartTime = 0;
  const timelineEndTime = 24;
  const timeRuler: JSX.Element[] = [];
  for (let i = timelineStartTime + 1; i <= timelineEndTime - 1; i++) {
    const left = (i / (timelineEndTime - timelineStartTime)) * 100;
    timeRuler.push(
      <span key={i} className="time" style={{ left: `${left}%` }}>
        {i}
      </span>,
    );
  }

  // 작업들을 시작 시간(오름차순)으로 정렬
  const sortedTodos = produce(todos, (draft) => {
    return draft.sort((a, b) => {
      if (a.startTime && b.startTime) {
        return b.startTime?.getTime() - a.startTime?.getTime();
      } else {
        return 0;
      }
    });
  });

  const taskElements = (): (JSX.Element | undefined)[] => {
    return sortedTodos.map((todo, index) => {
      if (!todo.startTime) return; // 시작 되지 않은 todo는 없음(타입 체킹용)

      const startHours = getHours(todo.startTime) - timelineStartTime;
      const left = (startHours / (timelineEndTime - timelineStartTime)) * 100;

      let targetTime;
      let progress = null;
      if (todo.finishTime) {
        targetTime = todo.finishTime;
      } else {
        targetTime = new Date(todo.startTime);
        targetTime.setMinutes(targetTime.getMinutes() + todo.targetMinutes);

        const elapsedMinutes =
          (new Date().getTime() - todo.startTime.getTime()) / 60000;
        const progressPercent = (elapsedMinutes / todo.targetMinutes) * 100;

        let progressWidth;
        if (progressPercent < 100) {
          progressWidth = progressPercent;
        } else {
          const progressSize = (elapsedMinutes / (60 * 24)) * 100;
          const targetRealSize = (todo.targetMinutes / (60 * 24)) * 100;
          const targetSize = getAdjustedSize(targetRealSize);
          if (progressSize > targetSize) {
            progressWidth = (progressSize / targetSize) * 100;
          } else {
            progressWidth = 100;
          }
        }

        progress = (
          <div
            className={cn('progress', { exceed: progressPercent >= 100 })}
            style={{ width: `${progressWidth}%` }}
          ></div>
        );
      }

      const consumedHours = getHours(targetTime) - getHours(todo.startTime);
      const taskRealWidth =
        (consumedHours / (timelineEndTime - timelineStartTime)) * 100;
      const taskWidth = getAdjustedSize(taskRealWidth);

      return (
        <div key={index}>
          <Tippy content={`${todo.text}`}>
            <div
              className={cn('item', { done: todo.finishTime })}
              style={{ left: `${left}%`, width: `${taskWidth}%` }}
            >
              <div className="item-text">{todo.text}</div>
              {progress}
            </div>
          </Tippy>
        </div>
      );
    });
  };

  useEffect(() => {
    setTasks(taskElements());
    const loop = setInterval(() => {
      setTasks(taskElements());
    }, 1000);

    return (): void => clearInterval(loop);
  }, [todos]);

  return (
    <div className="Timeline">
      <div className="graph">
        {tasks}
        <div className="line"></div>
        <div className="timebox">{timeRuler.map((value) => value)}</div>
      </div>
    </div>
  );
};

export default Timeline;
