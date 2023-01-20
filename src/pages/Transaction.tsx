import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toUtf8String } from 'ethers/lib/utils';
import { ConsolidatedTransaction, getTransaction } from '../utils/transactions';
import { Account } from '../components/Account';
import { Textarea } from '../components/Textarea';
import { Stack } from '../components/Stack';
import { Headline } from '../components/Headline';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

export type TransactionParams = {
  transactionId: string;
};

export const Transaction: FC = () => {
  const { transactionId } = useParams<TransactionParams>();
  const [transaction, setTransaction] = useState<
    ConsolidatedTransaction | undefined
  >(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const fetchTransaction = async (txId: string) => {
    const result = await getTransaction(txId);
    const data = toUtf8String(result.transaction.data);
    setTransaction(result);
    setMessage(data);
  };

  useEffect(() => {
    if (transactionId) {
      fetchTransaction(transactionId);
    }
  }, [transactionId]);

  return transaction ? (
    <div className="transaction">
      <Stack>
        {transaction.receipt.from === transaction.receipt.to ? (
          <Headline level={1}>
            Message by <Account address={transaction.receipt.from} />
          </Headline>
        ) : (
          <Headline level={1}>
            Message from <Account address={transaction.receipt.from} /> to{' '}
            <Account address={transaction.receipt.to} />
          </Headline>
        )}
        <Textarea value={message} readOnly />
        <p>
          This message{' '}
          {transaction.block?.timestamp
            ? `was sent on ${format(
                fromUnixTime(transaction.block.timestamp),
                'LLLL do yyyy'
              )} at ${format(
                fromUnixTime(transaction.block.timestamp),
                'HH:mm:ss'
              )} o’clock (${format(
                fromUnixTime(transaction.block.timestamp),
                'OOOO'
              )}) and`
            : ''}{' '}
          was confirmed {transaction.receipt.confirmations} times. It’s part of{' '}
          <a
            href={`https://etherscan.io/block/${transaction.receipt.blockNumber}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            block {transaction.receipt.blockNumber}
          </a>
          . You can also{' '}
          <a
            href={`https://etherscan.io/tx/${transaction.receipt.transactionHash}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            view the transaction on Etherscan
          </a>{' '}
          if you want to.
        </p>
      </Stack>
    </div>
  ) : null;
};
