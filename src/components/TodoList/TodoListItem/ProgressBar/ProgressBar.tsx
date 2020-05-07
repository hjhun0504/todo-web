import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './ProgressBar.scss';

interface FillerProps {
  percent: number;
  exceed: boolean;
}

const Filler = (props: FillerProps): JSX.Element => {
  const { percent, exceed } = props;

  return (
    <div
      className={cn('filler', { exceed })}
      style={{ width: `${percent}%` }}
    />
  );
};

interface Props {
  targetTime: Date;
  targetSeconds: number;
}

const ProgressBar = (props: Props): JSX.Element => {
  const { targetTime, targetSeconds } = props;
  const [timeLeft, setTimeLeft] = useState<string>();
  const [percent, setPercent] = useState<number>(100);
  const [exceed, setExceed] = useState<boolean>(false);

  const getLeftSeconds = (): number => {
    const currentTime = new Date();
    return Math.round((targetTime.getTime() - currentTime.getTime()) / 1000);
  };

  const getTimeString = (seconds: number): string => {
    let time;
    if (Math.abs(seconds) >= 60) {
      const minute = Math.round(seconds / 60);
      time = `${Math.abs(minute)}분`;
    } else {
      time = `${Math.abs(seconds)}초`;
    }

    if (seconds >= 0) {
      return `${time} 남음`;
    } else {
      return `${time} 초과`;
    }
  };

  const calcProgress = (): void => {
    const seconds = getLeftSeconds();
    setTimeLeft(getTimeString(seconds));
    if (seconds >= 0) {
      if (exceed) {
        setExceed(false);
      }
      setPercent((seconds / targetSeconds) * 100);
    } else {
      if (!exceed) {
        setPercent(100);
        setExceed(true);
      }
    }
  };

  useEffect(() => {
    calcProgress();
    const loop = setInterval(() => {
      calcProgress();
    }, 1000);
    return (): void => clearInterval(loop);
  }, [targetTime]);

  return (
    <div className="ProgressBar">
      <Filler percent={percent} exceed={exceed} />
      <div className="time-left">
        {timeLeft ? timeLeft : getTimeString(getLeftSeconds())}
      </div>
    </div>
  );
};

export default ProgressBar;
