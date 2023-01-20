import { FC, Children } from 'react';
import { WithChildren } from '../types/react';

import './Stack.scss';

export type StackProps = WithChildren;

export const Stack: FC<StackProps> = ({ children }) => {
  return (
    <div className="stack">
      {Children.map(children, (child) =>
        child ? <div className="stack__item">{child}</div> : null
      )}
    </div>
  );
};
