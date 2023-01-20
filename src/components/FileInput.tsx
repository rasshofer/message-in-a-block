import { nanoid } from 'nanoid';
import { FC, useEffect, useState } from 'react';

import './FileInput.scss';

export type FileInputProps = {
  onChange?: (file?: File) => void;
};

export const FileInput: FC<FileInputProps> = ({ onChange }) => {
  const [state, setState] = useState<string>(nanoid());
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => onChange?.(file), [file, onChange]);

  return (
    <div className="file-input">
      <div className="file-input__name">{file?.name ?? ''}</div>
      <input
        key={state}
        type="file"
        className="file-input__element"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      {file ? (
        <button
          className="file-input__clear"
          onClick={() => {
            setState(nanoid());
            setFile(undefined);
          }}
        >
          ×
        </button>
      ) : null}
      <div className="file-input__action">
        {file ? 'Change file' : 'Select file'}
      </div>
    </div>
  );
};
