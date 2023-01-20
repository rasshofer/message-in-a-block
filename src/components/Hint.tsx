import { FC } from 'react';
import classNames from 'classnames';
import { WithChildren } from '../types/react';

import './Hint.scss';

export type HintVariant = 'positive' | 'negative' | 'warning';

export type HintProps = WithChildren<{
  variant?: HintVariant;
}>;

export const Hint: FC<HintProps> = ({ variant, children }) => {
  return (
    <div className={classNames('hint', `hint--${variant}`)}>{children}</div>
  );
};
