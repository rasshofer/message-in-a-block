import { FC } from 'react';

import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>
        Anything you persist on the blockchain is irreversible once stored. It
        interferes with any right to be forgotten. Please don’t be an asshole
        but be kind/careful and use this service only for good and useful
        things. Please note that this website doesn’t have any back-end or
        database or any kind of storage on its own. Any transaction data,
        message, and exchange rate is fetched real-time via your local wallet
        and the Coinbase API.
      </p>
      <p>
        You can find the{' '}
        <a
          href="https://github.com/rasshofer/message-in-a-block"
          target="_blank"
          className="footer__link"
          rel="noreferrer"
        >
          source of code of »Message in a Block« on GitHub
        </a>{' '}
        if you’re interested.
      </p>
    </footer>
  );
};
