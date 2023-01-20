import { FixedNumber } from 'ethers/lib/ethers';

export type CoinbasePriceApiResult = {
  data: {
    base: string;
    currency: string;
    amount: string;
  };
};

export const getFiatExchangeRate = async (
  currency: string
): Promise<FixedNumber> => {
  const response = await fetch(
    `https://api.coinbase.com/v2/prices/ETH-${currency}/buy`
  );
  const result = (await response.json()) as CoinbasePriceApiResult;
  return FixedNumber.fromString(result.data.amount);
};
