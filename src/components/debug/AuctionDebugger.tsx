import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { NounsAuctionHouseABI } from '../../abi/NounsAuctionHouse';

const AUCTION_HOUSE_ADDRESS = '0x830BD73E4184ceF73443C15111a1DF14e495C706';

interface AuctionData {
  nounId: bigint;
  amount: bigint;
  startTime: bigint;
  endTime: bigint;
  bidder: `0x${string}`;
  settled: boolean;
}

const AuctionDebugger: React.FC = () => {
  const [currentNounId, setCurrentNounId] = useState<bigint | null>(null);

  const {
    data: currentAuctionData,
    error: currentAuctionError,
    isLoading: isCurrentAuctionLoading,
  } = useReadContract({
    abi: NounsAuctionHouseABI,
    address: AUCTION_HOUSE_ADDRESS,
    functionName: 'auction',
  }) as {
    data: AuctionData | undefined;
    error: Error | null;
    isLoading: boolean;
  };

  useEffect(() => {
    if (
      currentAuctionData &&
      typeof currentAuctionData === 'object' &&
      'nounId' in currentAuctionData
    ) {
      setCurrentNounId(currentAuctionData.nounId);
    }
  }, [currentAuctionData]);

  const {
    data: pastAuctionData,
    error: pastAuctionError,
    isLoading: isPastAuctionLoading,
  } = useReadContract({
    abi: NounsAuctionHouseABI,
    address: AUCTION_HOUSE_ADDRESS,
    functionName: 'getSettlements',
    args: currentNounId
      ? [currentNounId - BigInt(10), currentNounId - BigInt(1), false]
      : undefined,
  });

  const serializeBigInt = (data: any): any => {
    if (typeof data === 'bigint') {
      return data.toString();
    }
    if (Array.isArray(data)) {
      return data.map(serializeBigInt);
    }
    if (typeof data === 'object' && data !== null) {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          serializeBigInt(value),
        ])
      );
    }
    return data;
  };

  const renderData = (
    label: string,
    data: any,
    error: Error | null,
    isLoading: boolean
  ) => (
    <div style={{ marginBottom: '20px' }}>
      <h2>{label}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <pre>{JSON.stringify(serializeBigInt(data), null, 2)}</pre>
      )}
    </div>
  );

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <h1>Auction Debugger</h1>
      {renderData(
        'Current Auction',
        currentAuctionData,
        currentAuctionError,
        isCurrentAuctionLoading
      )}
      {renderData(
        'Past 10 Auctions',
        pastAuctionData,
        pastAuctionError,
        isPastAuctionLoading
      )}
    </div>
  );
};

export default AuctionDebugger;
