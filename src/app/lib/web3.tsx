import Web3 from 'web3';

const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_ENDPOINT as string);

export default web3;
