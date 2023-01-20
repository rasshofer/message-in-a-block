import classNames from 'classnames';
import { FC } from 'react';
import { WithChildren } from '../types/react';

import './Headline.scss';

export type HeadlineProps = WithChildren<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
}>;

export const Headline: FC<HeadlineProps> = ({ level, children }) => {
  return (
    <div className={classNames('headline', `headline--${level}`)}>
      {children}
    </div>
  );
};
