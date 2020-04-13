import React, { useState, useEffect } from 'react';
import './ProgressBar.scss';

interface FillerProps {
  percent: number;
}

const Filler = (props: FillerProps): JSX.Element => {
  const { percent } = props;

  return <div className="filler" style={{ width: `${percent}%` }} />;
};

interface Props {
  targetTime: Date;
  targetSeconds: number;
}

const ProgressBar = (props: Props): JSX.Element => {
  const { targetTime, targetSeconds } = props;
  const [timeLeft, setTimeLeft] = useState<string>();
  const [percent, setPercent] = useState<number>(100);

  const getLeftSeconds = (): number => {
    const currentTime = new Date();
    return Math.round((targetTime.getTime() - currentTime.getTime()) / 1000);
  };

  const getTimeString = (seconds: number): string => {
    if (seconds >= 60) {
      const minute = Math.round(seconds / 60);
      return `${minute}분`;
    } else {
      return `${seconds}초`;
    }
  };

  useEffect(() => {
    const loop = setInterval(() => {
      const seconds = getLeftSeconds();
      setTimeLeft(getTimeString(seconds));
      setPercent((seconds / targetSeconds) * 100);
    }, 1000);
    return (): void => clearInterval(loop);
  }, []);

  return (
    <div className="ProgressBar">
      <Filler percent={percent} />
      <div className="time-left">
        {timeLeft ? timeLeft : getTimeString(getLeftSeconds())} 남음
      </div>
    </div>
  );
};

export default ProgressBar;
