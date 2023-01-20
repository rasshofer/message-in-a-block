import { FC, useEffect, useState } from 'react';
import { getAliasForAccount } from '../utils/accounts';

export type AccountProps = {
  address: string;
};

export const Account: FC<AccountProps> = ({ address }) => {
  const [alias, setAlias] = useState<string | undefined>(undefined);

  const updateAliasForAccount = async (address: string) => {
    setAlias(await getAliasForAccount(address));
  };

  useEffect(() => {
    updateAliasForAccount(address);
  }, [address]);

  return <>{alias ?? address}</>;
};
