import {
  TransactionRequest,
  TransactionResponse,
  TransactionReceipt,
  Web3Provider,
  Block,
} from '@ethersproject/providers';
import { BigNumber } from 'ethers/lib/ethers';
import { hexlify, parseEther, toUtf8Bytes } from 'ethers/lib/utils';
import { getProvider } from './provider';

const generateTransactionRequest = async (
  provider: Web3Provider,
  from: string,
  to: string,
  message: string
): Promise<TransactionRequest> => ({
  from,
  to,
  value: parseEther('0'),
  nonce: await provider.getTransactionCount(from, 'latest'),
  data: hexlify(toUtf8Bytes(message)),
});

export type ConsolidatedTransaction = {
  transaction: TransactionResponse;
  receipt: TransactionReceipt;
  cost: BigNumber;
  block?: Block;
};

export const getTransaction = async (
  hash: string
): Promise<ConsolidatedTransaction> => {
  const provider = getProvider();

  if (provider) {
    const transaction = await provider.getTransaction(hash);
    const receipt = await provider.getTransactionReceipt(hash);
    const cost = receipt.effectiveGasPrice.mul(receipt.gasUsed);
    const block = transaction.blockHash
      ? await provider.getBlock(transaction.blockHash)
      : undefined;

    return {
      transaction,
      receipt,
      cost,
      block,
    };
  }

  return Promise.reject(new Error('Missing provider'));
};

export const sendMessage = async (
  from: string,
  to: string,
  message: string
): Promise<TransactionResponse> => {
  const provider = getProvider();

  if (provider) {
    const signer = provider.getSigner();
    const tx = await generateTransactionRequest(provider, from, to, message);
    const transaction = await signer.sendTransaction(tx);
    return transaction;
  }

  return Promise.reject(new Error('Missing provider'));
};

export const estimateMessageFee = async (
  from: string,
  to: string,
  message: string
): Promise<BigNumber | undefined> => {
  const provider = getProvider();

  if (provider) {
    const tx = await generateTransactionRequest(provider, from, to, message);
    const estimatedGas = await provider.estimateGas(tx);
    const feeData = await provider.getFeeData();
    return feeData.maxFeePerGas?.mul(estimatedGas);
  }

  return Promise.reject(new Error('Missing provider'));
};
