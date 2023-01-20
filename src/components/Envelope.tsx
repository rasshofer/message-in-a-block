import { FC } from 'react';
import { WithChildren } from '../types/react';

import './Envelope.scss';

export type EnvelopeProps = WithChildren;

export const Envelope: FC<EnvelopeProps> = ({ children }) => {
  return (
    <div className="envelope">
      <div className="envelope__content">{children}</div>
    </div>
  );
};
