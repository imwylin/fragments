import { useReadContract } from 'wagmi';

const NOUNS_TOKEN_ADDRESS = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03';

export interface INounSeed {
  accessory: number;
  background: number;
  body: number;
  glasses: number;
  head: number;
}

const nounsTokenABI = [
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'seeds',
    outputs: [
      { name: 'background', type: 'uint48' },
      { name: 'body', type: 'uint48' },
      { name: 'accessory', type: 'uint48' },
      { name: 'head', type: 'uint48' },
      { name: 'glasses', type: 'uint48' }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

export const useNounSeed = (nounId: bigint) => {
  const { data: seedData } = useReadContract({
    address: NOUNS_TOKEN_ADDRESS,
    abi: nounsTokenABI,
    functionName: 'seeds',
    args: [nounId],
  });

  if (!seedData) return null;

  const [background, body, accessory, head, glasses] = seedData;

  return {
    background: Number(background),
    body: Number(body),
    accessory: Number(accessory),
    head: Number(head),
    glasses: Number(glasses),
  } as INounSeed;
};

export const getNounImageUrl = (nounId: bigint, seed: INounSeed) => {
  const seedParam = encodeURIComponent(JSON.stringify(seed));
  return `/api/getNounSvg?seed=${seedParam}`;
};

export const getNoun = (nounId: bigint, seed: INounSeed) => {
  const id = nounId.toString();
  const name = `Noun ${id}`;
  const description = `Noun ${id} is a member of the Nouns DAO`;
  const image = getNounImageUrl(nounId, seed);

  return {
    name,
    description,
    image,
  };
};