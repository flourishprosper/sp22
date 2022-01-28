import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

let web3Modal;
let provider;
let selectedAccount;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    },
  },
};

web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions, // required
});

export const disconnectWallet = async () => {
  if (provider?.close) {
    await provider.close();
    await web3Modal.clearCachedProvider();
    provider = null;
  }
};

export const showWeb3WalletModal = async () => {
  console.log('Opening a dialog', web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch (e) {
    console.log('Could not get a wallet connection', e);
    return;
  }

  provider.on('accountsChanged', (accounts) => {});

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {});

  // Subscribe to networkId change
  provider.on('networkChanged', (networkId) => {});
};

export const getCurrentWalletAddress = async () => {
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  selectedAccount = accounts[0];
  return selectedAccount;
};

export const getCurrentNetworkId = async () => {
  provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  return await web3.eth.net.getId();
};
