import { FC, useEffect, useRef } from 'react';
import { Envelope } from './Envelope';

import './Textarea.scss';

export type TextareaProps = {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (newValue: string) => void;
};

export const Textarea: FC<TextareaProps> = ({
  value,
  placeholder,
  readOnly,
  onChange,
}) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = '0px';
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = `${scrollHeight + 1}px`;
    }
  }, [value]);

  return (
    <Envelope>
      <textarea
        ref={ref}
        className="textarea"
        cols={10}
        rows={10}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Envelope>
  );
};
