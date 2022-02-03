import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const providerOptions = {
  injected: {
    display: {
      name: 'Metamask',
      description: 'Connect with the provider in your Browser',
    },
    package: null,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      bridge: 'https://bridge.walletconnect.org',
      infuraId: process.env.REACT_APP_INFURA_ID,
    },
  },
};
