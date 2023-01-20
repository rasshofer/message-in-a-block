import { BigNumber } from 'ethers/lib/ethers';
import { createContext, useContext } from 'react';
import { Account } from './accounts';

export type User = {
  account?: Account;
  balance?: BigNumber;
};

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);
