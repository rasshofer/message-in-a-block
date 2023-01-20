/// <reference types="react-scripts" />

import { providers } from 'ethers';

declare global {
  declare var ethereum: providers.ExternalProvider;
}
