import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber, FixedNumber } from 'ethers/lib/ethers';
import { useDebounce, useInterval } from 'usehooks-ts';
import { useUser } from '../utils/context';
import { estimateMessageFee, sendMessage } from '../utils/transactions';
import { formatEther } from 'ethers/lib/utils';
import { getFiatExchangeRate } from '../utils/exchange';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Stack } from '../components/Stack';
import { Hint } from '../components/Hint';
import { Headline } from '../components/Headline';
import { Account } from '../components/Account';
import { Separator } from '../components/Separator';
import { FileInput } from '../components/FileInput';
import { getReasonPhraseForErrorCode, isEthersError } from '../utils/errors';

export type FormParams = {
  account?: string;
};

export const Form: FC = () => {
  const user = useUser();
  const { account: recipient } = useParams<FormParams>();
  const [feeEstimation, setFeeEstimation] = useState<BigNumber | undefined>();
  const [exchangeRate, setExchangeRate] = useState<FixedNumber | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [succeededTransaction, setSucceededTransaction] = useState<
    TransactionResponse | undefined
  >(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<string | undefined>(undefined);
  const debouncedMessage = useDebounce(message, 500);

  const calculateFeeForCurrentContent = useCallback(async () => {
    if (user?.account) {
      const rate = await getFiatExchangeRate('USD');
      const fee = await estimateMessageFee(
        user.account.address,
        user.account.address,
        file || debouncedMessage
      );

      setExchangeRate(rate);
      setFeeEstimation(fee);
    }
  }, [user, file, debouncedMessage]);

  useInterval(async () => {
    calculateFeeForCurrentContent();
  }, 5 * 1000);

  useEffect(() => {
    calculateFeeForCurrentContent();
  }, [file, debouncedMessage, calculateFeeForCurrentContent]);

  return (
    <div className="form">
      <Stack>
        <Headline level={1}>
          {recipient ? (
            <>
              Send a new {file ? 'file' : 'message'} in a block to{' '}
              <Account address={recipient} />
            </>
          ) : (
            `Send a new ${file ? 'file' : 'message'} in a block`
          )}
        </Headline>
        {!isSubmitting && errorMessage ? (
          <Hint variant="negative">
            <p>{errorMessage} Feel free to try again anytime.</p>
          </Hint>
        ) : null}
        {!isSubmitting && succeededTransaction ? (
          <Hint variant="positive">
            <p>Yay! Your message has been written onto the blockchain.</p>
            <p>
              Its transaction ID is{' '}
              <Link to={`/tx/${succeededTransaction.hash}`}>
                <code>{succeededTransaction.hash}</code>
              </Link>
            </p>
          </Hint>
        ) : null}
        {!file ? (
          <Textarea
            placeholder="Your message…"
            value={message}
            onChange={(newMessage) => setMessage(newMessage)}
          />
        ) : null}
        {!message && !file ? <Separator label="or" /> : null}
        {!message ? (
          <FileInput
            onChange={(file) => {
              if (file) {
                const reader = new FileReader();
                reader.addEventListener(
                  'load',
                  () => {
                    setFile((reader.result ?? '').toString());
                  },
                  false
                );
                reader.readAsDataURL(file);
              } else {
                setFile('');
              }
            }}
          />
        ) : null}
        {feeEstimation && exchangeRate ? (
          <p>
            Estimated fee: ~{formatEther(feeEstimation)} ETH (~
            {exchangeRate
              .mulUnsafe(FixedNumber.from(formatEther(feeEstimation)))
              .round(2)
              .toString()}{' '}
            USD)
          </p>
        ) : null}
        <Button
          disabled={
            !feeEstimation ||
            !exchangeRate ||
            (!file && !message) ||
            isSubmitting
          }
          label={file ? 'Send file' : 'Send message'}
          onClick={async () => {
            if (user?.account) {
              try {
                setIsSubmitting(true);
                const transaction = await sendMessage(
                  user.account.address,
                  recipient ?? user.account.address,
                  file || message
                );
                setSucceededTransaction(transaction);
              } catch (e) {
                if (isEthersError(e)) {
                  setErrorMessage(getReasonPhraseForErrorCode(e.code));
                }
                setIsSubmitting(false);
                setSucceededTransaction(undefined);
              }
            } else {
              setErrorMessage(
                'Please sign in using your local wallet (e.g. MetaMask) first.'
              );
            }
          }}
        />
      </Stack>
    </div>
  );
};
