import React from 'react';
import './CustomButton.scss';

interface Props {
  value: string;
}

const CustomButton = (props: Props): JSX.Element => {
  const { value } = props;

  return <button className="CustomButton">{value}</button>;
};

export default CustomButton;
