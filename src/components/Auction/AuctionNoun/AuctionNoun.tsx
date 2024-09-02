import React, { useEffect, useRef, useState } from 'react';
import { useReadContracts } from 'wagmi';
import dynamic from 'next/dynamic';
import classes from '../styles/AuctionNoun.module.css';

const AUCTION_HOUSE_ADDRESS = '0x830BD73E4184ceF73443C15111a1DF14e495C706';
const NOUNS_TOKEN_ADDRESS = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03';

const buildSVG = dynamic(
  () => import('@nouns/sdk').then((mod) => mod.buildSVG),
  { ssr: false }
);

const getNounData = dynamic(
  () => import('@nouns/assets').then((mod) => mod.getNounData),
  { ssr: false }
);

const nounsTokenABI = [
  {
    inputs: [{ name: 'nounId', type: 'uint256' }],
    name: 'seeds',
    outputs: [
      { name: 'background', type: 'uint48' },
      { name: 'body', type: 'uint48' },
      { name: 'accessory', type: 'uint48' },
      { name: 'head', type: 'uint48' },
      { name: 'glasses', type: 'uint48' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const auctionHouseABI = [
  {
    inputs: [],
    name: 'auction',
    outputs: [
      { name: 'nounId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
      { name: 'bidder', type: 'address' },
      { name: 'settled', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

interface AuctionNounProps {
  onColorExtracted: (color: string) => void;
  onNounIdChange: (nounId: bigint) => void;
}

const AuctionNoun: React.FC<AuctionNounProps> = ({
  onColorExtracted,
  onNounIdChange,
}) => {
  const [nounId, setNounId] = useState<bigint>(BigInt(0));
  const [svgData, setSvgData] = useState<string | null>(null);
  const [isAuctionNoun, setIsAuctionNoun] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { data: auctionData, isLoading: isAuctionLoading } = useReadContracts({
    contracts: [
      {
        address: AUCTION_HOUSE_ADDRESS,
        abi: auctionHouseABI,
        functionName: 'auction',
      },
    ],
  });

  useEffect(() => {
    if (
      isAuctionNoun &&
      auctionData &&
      Array.isArray(auctionData) &&
      auctionData[0] &&
      'result' in auctionData[0]
    ) {
      const result = auctionData[0].result;
      if (Array.isArray(result) && result.length > 0) {
        const fetchedNounId = result[0];
        if (typeof fetchedNounId === 'bigint') {
          setNounId(fetchedNounId);
          onNounIdChange(fetchedNounId);
          setError(null);
        } else {
          setError('Invalid NounId received');
        }
      } else {
        setError('No auction data available');
      }
    } else if (
      auctionData &&
      Array.isArray(auctionData) &&
      auctionData[0] &&
      'error' in auctionData[0]
    ) {
      setError(auctionData[0].error?.message || 'An unknown error occurred');
    }
  }, [auctionData, onNounIdChange, isAuctionNoun]);

  const { data: seedData, isLoading: isSeedLoading } = useReadContracts({
    contracts: [
      {
        address: NOUNS_TOKEN_ADDRESS,
        abi: nounsTokenABI,
        functionName: 'seeds',
        args: [nounId],
      },
    ],
  });

  useEffect(() => {
    const generateSVG = async () => {
      if (
        buildSVG &&
        getNounData &&
        seedData &&
        Array.isArray(seedData) &&
        seedData[0] &&
        'result' in seedData[0]
      ) {
        const result = seedData[0].result;
        if (Array.isArray(result) && result.length === 5) {
          const seed = {
            background: Number(result[0]),
            body: Number(result[1]),
            accessory: Number(result[2]),
            head: Number(result[3]),
            glasses: Number(result[4]),
          };

          const { parts, background } = await getNounData(seed);
          const svg = await buildSVG(parts, [], background);
          setSvgData(svg);
        } else {
          setError('Invalid seed data');
        }
      }
    };

    generateSVG();
  }, [nounId, seedData]);

  useEffect(() => {
    if (svgData && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          if (imageData) {
            const { data } = imageData;
            const length = data.length;
            let r = 0,
              g = 0,
              b = 0,
              count = 0;

            for (let i = 0; i < length; i += 4) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              count++;
            }

            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);

            const dominantColor = `rgb(${r}, ${g}, ${b})`;
            onColorExtracted(dominantColor);
          }
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
    }
  }, [svgData, onColorExtracted]);

  const handlePrevious = () => {
    setIsAuctionNoun(false);
    setNounId((prevId) => {
      const newId = prevId > BigInt(0) ? prevId - BigInt(1) : BigInt(0);
      onNounIdChange(newId);
      return newId;
    });
  };

  const handleReset = () => {
    setIsAuctionNoun(true);
  };

  if (isAuctionLoading && isAuctionNoun) {
    return <div>Loading Auction Noun...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.auctionNounWrapper}>
      <div className={classes.noun}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Noun ${nounId.toString()}`}
            className={classes.nounImage}
          />
        ) : (
          <div>Loading Noun image...</div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div className={classes.buttonContainer}>
        <button onClick={handlePrevious} className={classes.navButton}>
          Previous
        </button>
        <button
          onClick={handleReset}
          className={classes.navButton}
          disabled={isAuctionNoun}
        >
          Reset to Auction Noun
        </button>
      </div>
    </div>
  );
};

export default AuctionNoun;
