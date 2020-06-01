import React, { ReactNode } from 'react';
import './CustomButton.scss';

interface Props {
  children: ReactNode;
}

const CustomButton = (props: Props): JSX.Element => {
  const { children } = props;

  return <button className="CustomButton">{children}</button>;
};

export default CustomButton;
