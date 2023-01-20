import { FC } from 'react';
import { Headline } from '../components/Headline';
import { Stack } from '../components/Stack';

export const Lobby: FC = () => {
  return (
    <div className="lobby">
      <Stack>
        <Headline level={1}>Sign in using your wallet to get started</Headline>
        <p>
          »Message in a Block« allows you to send permanent (and uncensorable)
          messages as transaction input data on the blockchain (instead of
          carving them into a park bench, tree, or toilet wall).
        </p>
        <p>
          You can send the message to yourself (e.g. for the sake of persisting
          it on the blockchain) or to any wallet address (e.g. to send them an
          unforgettable message).
        </p>
        <p>
          To get started, please sign in using your local wallet (e.g. MetaMask)
          or install a wallet if you don’t have one so far.
        </p>
      </Stack>
    </div>
  );
};
