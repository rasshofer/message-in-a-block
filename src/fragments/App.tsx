import { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BigNumber } from 'ethers/lib/ethers';
import { Account, getAccounts } from '../utils/accounts';
import { getBalance } from '../utils/balance';
import { UserContext } from '../utils/context';
import { Header } from './Header';
import { Footer } from './Footer';
import { Form } from '../pages/Form';
import { Transaction } from '../pages/Transaction';
import { Lobby } from '../pages/Lobby';
import { Loader } from '../components/Loader';

import './App.scss';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<Account | undefined>();
  const [balance, setBalance] = useState<BigNumber | null>();

  const fetchAccount = useCallback(async () => {
    try {
      const [account] = await getAccounts();
      if (account) {
        const balance = await getBalance(account.address);
        setAccount(account);
        setBalance(balance);
        setIsLoading(false);
      }
    } catch (error) {
      /* NOOP */
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <UserContext.Provider
      value={
        account && balance
          ? {
              account,
              balance,
            }
          : null
      }
    >
      <div className="app">
        <Router>
          <Header />
          {isLoading ? (
            <Loader />
          ) : account ? (
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/to/:account" element={<Form />} />
              <Route path="/tx/:transactionId" element={<Transaction />} />
            </Routes>
          ) : (
            <Lobby />
          )}
          <Footer />
        </Router>
      </div>
    </UserContext.Provider>
  );
};
