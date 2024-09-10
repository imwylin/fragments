import React, { useEffect, useRef, useState } from 'react';
import {
  useBlockNumber,
  useReadContract,
  useReadContracts,
  useWatchContractEvent,
} from 'wagmi';
import { formatEther, Log } from 'viem';
import { ENSName } from 'react-ens-name';
import { useNounSeed } from '../../utils/nounToken';
import { NounsAuctionHouseABI } from '../../abis/NounsAuctionHouse';
import ProbeNounsLink from './ProbeNounsLink';
import AuctionButton from './AuctionButton';
import classes from './AuctionNoun.module.css';

const AUCTION_HOUSE_ADDRESS = '0x830BD73E4184ceF73443C15111a1DF14e495C706';

interface AuctionNounProps {
  onColorExtracted: (color: string) => void;
  onNounIdChange: (nounId: bigint) => void;
  extractedColor: string;
}

interface AuctionData {
  nounId: bigint;
  amount: bigint;
  startTime: bigint;
  endTime: bigint;
  bidder: `0x${string}`;
  settled: boolean;
}

interface PastAuctionData {
  blockTimestamp: bigint;
  amount: bigint;
  winner: `0x${string}`;
  nounId: bigint;
  clientId: bigint;
}

const AuctionNoun: React.FC<AuctionNounProps> = ({
  onColorExtracted,
  onNounIdChange,
  extractedColor,
}) => {
  const [nounId, setNounId] = useState<bigint>(BigInt(0));
  const [svg, setSvg] = useState<string | null>(null);
  const [isAuctionNoun, setIsAuctionNoun] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchNounId, setSearchNounId] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [auctionNounId, setAuctionNounId] = useState<bigint>(BigInt(0));

  const { data: auctionData } = useReadContracts({
    contracts: [
      {
        address: AUCTION_HOUSE_ADDRESS,
        abi: NounsAuctionHouseABI,
        functionName: 'auction',
      },
    ],
  });

  const { data: blockNumber } = useBlockNumber();

  const {
    data: currentAuctionData,
    error: currentAuctionError,
    isLoading: isCurrentAuctionLoading,
  } = useReadContract({
    address: AUCTION_HOUSE_ADDRESS,
    abi: NounsAuctionHouseABI,
    functionName: 'auction',
  }) as {
    data: AuctionData | undefined;
    error: Error | null;
    isLoading: boolean;
  };

  const {
    data: pastAuctionData,
    error: pastAuctionError,
    isLoading: isPastAuctionLoading,
  } = useReadContract({
    abi: NounsAuctionHouseABI,
    address: AUCTION_HOUSE_ADDRESS,
    functionName: 'getSettlements',
    args: nounId ? [nounId, nounId + BigInt(1), false] : undefined,
  });

  const seed = useNounSeed(nounId);

  const updateTimeLeft = () => {
    if (
      isAuctionNoun &&
      currentAuctionData &&
      'endTime' in currentAuctionData
    ) {
      const auctionData = currentAuctionData as AuctionData;
      const timer = setInterval(() => {
        const now = Date.now() / 1000;
        const endTime = Number(auctionData.endTime);
        const diff = endTime - now;

        if (diff <= 0) {
          setTimeLeft('Auction ended');
          clearInterval(timer);
        } else {
          const hours = Math.floor(diff / 3600);
          const minutes = Math.floor((diff % 3600) / 60);
          const seconds = Math.floor(diff % 60);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  };

  useEffect(() => {
    updateTimeLeft();
  }, [isAuctionNoun, currentAuctionData]);

  useEffect(() => {
    console.log('Auction Data:', auctionData);
  }, [auctionData]);

  useEffect(() => {
    if (auctionData && Array.isArray(auctionData) && auctionData[0]) {
      const result = auctionData[0].result;
      if (result && typeof result === 'object' && 'nounId' in result) {
        const fetchedNounId = result.nounId;
        if (typeof fetchedNounId === 'bigint') {
          setNounId(fetchedNounId);
          setAuctionNounId(fetchedNounId);
          onNounIdChange(fetchedNounId);
          setIsAuctionNoun(true);
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
  }, [auctionData, onNounIdChange]);

  useEffect(() => {
    if (seed !== null && seed !== undefined) {
      const loadBuildSVG = async () => {
        try {
          const response = await fetch('/api/generateSVG', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seed }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Network response was not ok. Status: ${response.status}. Details: ${errorData.error}`
            );
          }

          const data = await response.json();
          setSvg(`data:image/svg+xml;base64,${btoa(data.svg)}`);
          setError(null);
        } catch (err) {
          if (err instanceof Error) {
            setError('Failed to load SVG: ' + err.message);
          } else {
            setError('Failed to load SVG: An unknown error occurred');
          }
        }
      };

      loadBuildSVG();
    }
  }, [seed, nounId]);

  useEffect(() => {
    if (svg && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
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
        img.src = svg;
      }
    }
  }, [svg, onColorExtracted]);

  useEffect(() => {
    if (currentAuctionData && isAuctionNoun) {
      const typedAuctionData = currentAuctionData as AuctionData;
      setNounId(typedAuctionData.nounId);
      setAuctionNounId(typedAuctionData.nounId);
      onNounIdChange(typedAuctionData.nounId);
    }
  }, [currentAuctionData, isAuctionNoun, onNounIdChange]);

  const handlePrevious = () => {
    setNounId((prevId) => {
      const newId = prevId > BigInt(0) ? prevId - BigInt(1) : BigInt(0);
      onNounIdChange(newId);
      setIsAuctionNoun(false);
      return newId;
    });
  };

  const handleNext = () => {
    setNounId((prevId) => {
      const newId = prevId + BigInt(1);
      if (newId <= auctionNounId) {
        onNounIdChange(newId);
        setIsAuctionNoun(newId === auctionNounId);
        return newId;
      }
      return prevId;
    });
  };

  const handleReset = () => {
    setNounId(auctionNounId);
    setIsAuctionNoun(true);
    onNounIdChange(auctionNounId);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = BigInt(searchNounId);
    setIsAuctionNoun(false);
    setNounId(id);
    onNounIdChange(id);
    setSearchNounId('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNounId(e.target.value);
  };

  const renderAuctionInfo = () => {
    if (isCurrentAuctionLoading || isPastAuctionLoading) {
      return (
        <div className={classes.auctionInfo}>
          <h2>Loading Auction Data</h2>
          <div className={classes.loadingContainer}>
            <img
              src="/loadingdata.gif"
              alt="Loading"
              className={classes.loadingDataGif}
            />
          </div>
        </div>
      );
    }

    if (
      isAuctionNoun &&
      currentAuctionData &&
      typeof currentAuctionData === 'object' &&
      'amount' in currentAuctionData &&
      'bidder' in currentAuctionData
    ) {
      return (
        <div className={classes.auctionInfo}>
          <h2>Current Auction</h2>
          <p>Time Left: {timeLeft}</p>
          <p>
            Bidder: <ENSName address={currentAuctionData.bidder} />
          </p>
          <p>High Bid: {formatEther(currentAuctionData.amount)} Ξ</p>
        </div>
      );
    } else if (Array.isArray(pastAuctionData)) {
      const settlement = pastAuctionData.find((s) => s.nounId === nounId);
      if (settlement) {
        return (
          <div className={classes.auctionInfo}>
            <h2>Past Auction</h2>
            <p>
              Auction Ended:{' '}
              {new Date(
                Number(settlement.blockTimestamp) * 1000
              ).toLocaleString()}
            </p>
            <p>
              Winner: <ENSName address={settlement.winner.toString()} />
            </p>
            <p>Client ID: {settlement.clientId}</p>
            <p>Winning Bid: {formatEther(settlement.amount)} Ξ</p>
          </div>
        );
      } else {
        return (
          <div className={classes.auctionInfo}>
            <h2>No Past Auction Data</h2>
            <p>
              There is no past auction data available for Noun ID{' '}
              {nounId.toString()}.
            </p>
          </div>
        );
      }
    }
    return null;
  };
  

  return (
    <div
      className={classes.auctionNounWrapper}
      style={{ backgroundColor: extractedColor }}
    >
      <div className={classes.nounContent}>
        <div className={classes.nounImageSection}>
          <div className={classes.nounId}>Noun {nounId.toString()}</div>
          <div className={classes.noun}>
            {!svg ? (
              <div className={classes.loadingContainer}>
                <img
                  src="/loading.gif"
                  alt="Loading"
                  className={classes.loadingGif}
                />
              </div>
            ) : (
              <img
                src={svg}
                alt={`Noun ${nounId.toString()}`}
                className={classes.nounImage}
              />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
          <div className={classes.buttonContainer}>
            <button
              onClick={handlePrevious}
              className={classes.navButton}
              disabled={nounId === BigInt(0)}
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className={classes.navButton}
              disabled={nounId >= auctionNounId}
            >
              &gt;
            </button>
            <button
              onClick={handleReset}
              className={classes.navButton}
              disabled={isAuctionNoun}
            >
              Return to Auction
            </button>
          </div>
          <form onSubmit={handleSearchSubmit} className={classes.searchForm}>
            <input
              type="text"
              placeholder="Enter Noun ID"
              value={searchNounId}
              onChange={handleSearchChange}
              className={classes.searchInput}
            />
            <button type="submit" className={classes.searchButton}>
              Search
            </button>
          </form>
          <ProbeNounsLink />
        </div>
        <div className={classes.auctionInfoSection}>
          {renderAuctionInfo()}
          <AuctionButton />
        </div>
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
};

export default AuctionNoun;
