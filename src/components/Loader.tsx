import { FC } from 'react';
import { WithChildren } from '../types/react';

import './Loader.scss';

export type LoaderProps = WithChildren;

export const Loader: FC<LoaderProps> = ({ children }) => {
  return (
    <div className="loader">
      <div className="loader__content">{children}</div>
    </div>
  );
};
