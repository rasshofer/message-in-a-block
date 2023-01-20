import { FC } from 'react';
import classNames from 'classnames';

import './Button.scss';

export type ButtonProps = {
  type?: 'button' | 'submit';
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({
  type = 'button',
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={classNames('button', {
        'button--disabled': disabled,
      })}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
