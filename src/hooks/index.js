import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useContractCall, useContractFunction } from '@usedapp/core';
import NFTContractABI from '../abis/NFTContractABI.json';
import { NFTContractAddress } from '../contracts';

const NFTContractInterface = new ethers.utils.Interface(NFTContractABI);

const nftContract = new Contract(NFTContractAddress, NFTContractInterface);

export const useCost = () => {
  const [cost] =
    useContractCall({
      abi: NFTContractInterface,
      address: NFTContractAddress,
      method: 'cost',
      args: [],
    }) ?? [];

  return cost;
};

export const useTotalSupply = () => {
  const [totalSupply] =
    useContractCall({
      abi: NFTContractInterface,
      address: NFTContractAddress,
      method: 'totalSupply',
      args: [],
    }) ?? [];

  return totalSupply;
};

export const useMaxSupply = () => {
  const [maxSupply] =
    useContractCall({
      abi: NFTContractInterface,
      address: NFTContractAddress,
      method: 'maxSupply',
      args: [],
    }) ?? [];

  return maxSupply;
};

export const useWalletOfOwner = (account) => {
  const [walletOfOwner] =
    useContractCall(
      account && {
        abi: NFTContractInterface,
        address: NFTContractAddress,
        method: 'walletOfOwner',
        args: [account],
      }
    ) ?? [];

  return walletOfOwner;
};

export const useTokenURI = (id) => {
  const [tokenURI] =
    useContractCall(
      id && {
        abi: NFTContractInterface,
        address: NFTContractAddress,
        method: 'tokenURI',
        args: [id],
      }
    ) ?? [];

  return tokenURI;
};

export const useMint = () => {
  const { state, send, event } = useContractFunction(nftContract, 'mint', {});

  return { state, send, event };
};
