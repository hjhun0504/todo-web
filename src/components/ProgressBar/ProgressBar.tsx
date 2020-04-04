import React from 'react';
import './ProgressBar.scss';

interface Props {
  percent: number;
}

const Filler = (props: Props): JSX.Element => {
  const { percent } = props;

  return <div className="filler" style={{ width: `${percent}%` }} />;
};

const ProgressBar = (props: Props): JSX.Element => {
  const { percent } = props;

  return (
    <div className="ProgressBar">
      <Filler percent={percent} />
      <div className="time-left">30분 남음</div>
    </div>
  );
};

export default ProgressBar;
