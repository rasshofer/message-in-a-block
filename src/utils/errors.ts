import { ErrorCode } from '@ethersproject/logger';

export type EthersError = Error & {
  code: ErrorCode;
};

export const isEthersError = (e: unknown): e is EthersError =>
  e instanceof Error && Object.prototype.hasOwnProperty.call(e, 'code');

export const getReasonPhraseForErrorCode = (code: ErrorCode): string => {
  switch (code) {
    case ErrorCode.ACTION_REJECTED:
      return 'It seems that you rejected the action (such as signing the message or sending the transaction).';
    case ErrorCode.TIMEOUT:
      return 'Whoops, this timed out.';
    case ErrorCode.NETWORK_ERROR:
      return 'Whoops, looks like a network error?';
    case ErrorCode.SERVER_ERROR:
      return 'Huh, we received some sort of bad response from the server.';
    case ErrorCode.INSUFFICIENT_FUNDS:
      return 'Oh no, it seems that you got insufficient funds?';
    case ErrorCode.NONCE_EXPIRED:
      return 'Oh no, nonce has already been used?';
    case ErrorCode.REPLACEMENT_UNDERPRICED:
      return 'The replacement fee for the transaction is too low.';
    case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
      return 'Oh no, the gas limit could not be estimated.';
    case ErrorCode.TRANSACTION_REPLACED:
      return 'Huh, the transaction was replaced by one with a higher gas price?';
    default:
      return 'Oh no, something went wrong.';
  }
};
