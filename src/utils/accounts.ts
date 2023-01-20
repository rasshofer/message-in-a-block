import {} from 'ethers';
import { getProvider } from './provider';

export type Account = {
  address: string;
  alias?: string;
};

export const getAliasForAccount = async (
  account: string
): Promise<string | undefined> => {
  const provider = getProvider();

  if (provider) {
    const alias = await provider.lookupAddress(account);
    return alias || undefined;
  }

  return account;
};

export const getAccounts = async (): Promise<Account[]> => {
  const provider = getProvider();

  if (provider) {
    const accounts: string[] = await provider.send('eth_requestAccounts', []);

    return Promise.all(
      accounts.map(async (item) => {
        return {
          address: item,
          alias: await getAliasForAccount(item),
        };
      })
    );
  }

  return [];
};
