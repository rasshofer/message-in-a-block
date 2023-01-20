import { providers } from 'ethers';

export const getProvider = (): providers.Web3Provider | undefined => {
  return new providers.Web3Provider(window.ethereum);
};

export const getSigner = (): providers.JsonRpcSigner | undefined => {
  const provider = getProvider();
  if (provider) {
    const signer = provider.getSigner();
    return signer;
  }
};
