import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useBlockNumber, useReadContract, useReadContracts, useWatchContractEvent, usePublicClient } from 'wagmi';
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
  const [auctionEndTime, setAuctionEndTime] = useState<bigint>(BigInt(0));
  const [auctionNounId, setAuctionNounId] = useState<bigint>(BigInt(0));
  const [isAuctionEnded, setIsAuctionEnded] = useState<boolean>(false);
  const [nextNounId, setNextNounId] = useState<bigint>(BigInt(0));
  
  const publicClient = usePublicClient();

  const displayNounId = isAuctionEnded ? nextNounId : nounId;
  const seed = useNounSeed(displayNounId);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: {
      refetchInterval: 4000, // Poll every 4 seconds
    }
  });

  // Add a debug useEffect to verify block updates
  useEffect(() => {
    console.log('Current block number:', blockNumber);
  }, [blockNumber]);

  const { data: auctionData } = useReadContracts({
    contracts: [
      {
        address: AUCTION_HOUSE_ADDRESS,
        abi: NounsAuctionHouseABI,
        functionName: 'auction',
      },
    ],
  });

  const {
    data: currentAuctionData,
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
    isLoading: isPastAuctionLoading,
  } = useReadContract({
    abi: NounsAuctionHouseABI,
    address: AUCTION_HOUSE_ADDRESS,
    functionName: 'getSettlements',
    args: nounId ? [nounId, nounId + BigInt(1), false] : undefined,
  });

  const updateTimeLeft = useCallback(() => {
    if (isAuctionNoun && currentAuctionData && 'endTime' in currentAuctionData) {
      const auctionData = currentAuctionData as AuctionData;
      
      const timer = setInterval(() => {
        const now = Date.now() / 1000;
        const endTime = Number(auctionData.endTime);
        const diff = endTime - now;
  
        if (diff <= 0) {
          if (auctionData.settled) {  // Only clear interval if auction is settled
            setTimeLeft('Auction ended');
            setIsAuctionEnded(true);
            setNextNounId(auctionData.nounId + BigInt(1));
            clearInterval(timer);
          } else {
            // Auction time expired but not settled - keep updating
            setTimeLeft('Auction ended - ' + now);
            setIsAuctionEnded(true);
            setNextNounId(auctionData.nounId + BigInt(1));
          }
        } else {
          // Auction still active
          setIsAuctionEnded(false);  // Reset in case of auction extension
          const hours = Math.floor(diff / 3600);
          const minutes = Math.floor((diff % 3600) / 60);
          const seconds = Math.floor(diff % 60);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [isAuctionNoun, currentAuctionData]);
  
  useEffect(() => {
    const cleanup = updateTimeLeft();
    return () => {
      if (cleanup) cleanup();
    };
  }, [updateTimeLeft]);

  useEffect(() => {
    if (currentAuctionData && 'endTime' in currentAuctionData) {
      const auctionData = currentAuctionData as AuctionData;
      const now = Date.now() / 1000;
      const endTime = Number(auctionData.endTime);
      const diff = endTime - now;
  
      if (diff > 0) {
        setTimeLeft('Calculating...');
        setIsAuctionEnded(false);
      } else {
        setTimeLeft('Auction ended');
        setIsAuctionEnded(true);
        setNextNounId(auctionData.nounId + BigInt(1));
      }
    }
  }, [currentAuctionData]);

  useEffect(() => {
    if (seed !== null && seed !== undefined) {
      const loadBuildSVG = async () => {
        try {
          console.log('Sending request to generateSVG:', { 
            seed, 
            isNextNoun: isAuctionEnded,
            blockNumber: isAuctionEnded && blockNumber ? Number(blockNumber) : undefined
          });

          const response = await fetch('/api/generateSVG', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              seed, 
              isNextNoun: isAuctionEnded,
              blockNumber: isAuctionEnded && blockNumber ? Number(blockNumber) : undefined
            }),
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
  }, [seed, nounId, isAuctionEnded, blockNumber]);

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

    if (isAuctionEnded) {
      return (
        <div className={classes.auctionInfo}>
          <h2>Auction Ended</h2>
          <p>Settle the Noun to start the auction!</p>
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
          <div className={classes.nounId}>Noun {displayNounId.toString()}</div>
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
                alt={`Noun ${displayNounId.toString()}`}
                className={classes.nounImage}
              />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
          <div className={classes.desktopControls}>
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
        </div>
        <div className={classes.desktopAuctionInfoSection}>
          {renderAuctionInfo()}
          <AuctionButton />
        </div>
        <div className={classes.mobileControlsAndInfo}>
          <div className={classes.mobileControls}>
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
          <div className={classes.mobileAuctionInfoSection}>
            {renderAuctionInfo()}
            <AuctionButton />
          </div>
        </div>
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}

export default AuctionNoun;
