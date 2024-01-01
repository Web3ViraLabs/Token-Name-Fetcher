import web3 from './web3';

/**
 * Fetches the name of a token from a smart contract.
 *
 * @param contractAddress The address of the smart contract.
 * @returns The name of the token.
 * @throws An error if there is an issue fetching the name.
 */
const fetchTokenName = async (contractAddress: string): Promise<string> => {
  // Create an instance of the smart contract
  const contract = new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    contractAddress
  );

  let name: string;

  try {
    // Fetch the name of the token from the contract
    name = (await contract.methods.name().call()) as string;
  } catch (error) {
    // Log and throw an error if there is an issue fetching the name
    console.error('Error fetching token name:', error);
    throw error;
  }

  return name;
};

export default fetchTokenName;
