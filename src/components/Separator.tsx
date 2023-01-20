import { FC } from 'react';

import './Separator.scss';

export type SeparatorProps = {
  label: string;
};

export const Separator: FC<SeparatorProps> = ({ label }) => {
  return (
    <div className="separator">
      <div className="separator__content">{label}</div>
    </div>
  );
};
