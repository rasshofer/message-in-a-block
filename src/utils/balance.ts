import { BigNumber } from 'ethers/lib/ethers';
import { getProvider } from './provider';

export const getBalance = async (address: string): Promise<BigNumber> => {
  const provider = getProvider();

  if (provider) {
    const balance = await provider.getBalance(address);
    return balance;
  }

  return BigNumber.from(0);
};
