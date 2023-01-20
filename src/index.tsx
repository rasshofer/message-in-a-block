import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './fragments/App';

import './scss/base.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
