import { formatEther } from 'viem';
import { ImageData, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder';
import { Noun } from '../server/api/types';
import { http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(process.env.PROVIDER_URL!),
  },

  projectId: 'c26f35e1c2912bad34b5cb4435f5c459',

  // Required App Info
  appName: 'fragments',

  // Optional App Info
  appDescription: 'play Nouns',
  appUrl: '', // your app's url
  appIcon: '', // your app's icon, no bigger than 1024x1024px (max. 1MB)
});

export function checkIsAuthor(bidder: string, author: string | undefined) {
  if (!author) {
    return false;
  }

  bidder = bidder.toLocaleLowerCase();
  author = author.toLocaleLowerCase();

  const authors = process.env.AUTHORS?.toLocaleLowerCase();
  if (bidder === author) {
    return true;
  }
  return authors?.indexOf(author) != -1 ? true : false;
}

export function formatBidValue(value: bigint) {
  const s = formatEther(value);
  if (s.includes('.')) {
    return s;
  }
  return s + '.0';
}

export function formatAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-5)}`;
}

export function createNounSVG(noun: Noun, isBackground?: boolean): string {
  if (!noun) {
    return '';
  }

  try {
    const data = getNounData(noun);
    const { parts, background } = data;

    let svgBinary;

    if (isBackground) {
      svgBinary = buildSVG(parts, ImageData.palette, background);
    } else {
      svgBinary = buildSVG(parts, ImageData.palette);
    }

    return 'data:image/svg+xml;base64,' + btoa(svgBinary);
  } catch (e) {
    console.error(e);
    return '';
  }
}
