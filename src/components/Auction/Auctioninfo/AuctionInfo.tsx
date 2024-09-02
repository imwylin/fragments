import React, { useEffect, useState } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import { NounsAuctionHouseABI } from '../../abi/NounsAuctionHouse';
import { formatEther } from 'viem';

interface AuctionInfoProps {
  nounId: number;
}

interface AuctionData {
  nounId: bigint;
  amount: bigint;
  startTime: bigint;
  endTime: bigint;
  bidder: string;
  settled: boolean;
}

interface Settlement {
  blockTimestamp: bigint;
  amount: bigint;
  winner: string;
  nounId: bigint;
  clientId: bigint;
}

const AuctionInfo: React.FC<AuctionInfoProps> = ({ nounId }) => {
  const [isCurrentAuction, setIsCurrentAuction] = useState(false);
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [settlement, setSettlement] = useState<Settlement | null>(null);

  const { data: currentAuction } = useReadContract({
    address: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    abi: NounsAuctionHouseABI,
    functionName: 'auction',
  }) as { data: AuctionData | undefined };

  const { data: settlementData } = useReadContracts({
    contracts: [
      {
        address: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
        abi: NounsAuctionHouseABI,
        functionName: 'getSettlements',
        args: [[BigInt(nounId), BigInt(nounId + 1)], false],
      },
    ],
  }) as { data: [Settlement[]] | undefined };

  useEffect(() => {
    if (currentAuction) {
      const currentNounId = Number(currentAuction.nounId);
      setIsCurrentAuction(nounId === currentNounId);
      if (nounId === currentNounId) {
        setAuctionData(currentAuction);
        setSettlement(null);
      } else if (nounId < currentNounId) {
        setAuctionData(null);
        if (settlementData && settlementData[0] && settlementData[0][0]) {
          setSettlement(settlementData[0][0]);
        }
      }
    }
  }, [nounId, currentAuction, settlementData]);

  if (isCurrentAuction && auctionData) {
    return (
      <div>
        <h2>Current Auction</h2>
        <p>Noun ID: {nounId}</p>
        <p>Current Bid: {formatEther(auctionData.amount)} ETH</p>
        <p>Bidder: {auctionData.bidder}</p>
        <p>
          End Time:{' '}
          {new Date(Number(auctionData.endTime) * 1000).toLocaleString()}
        </p>
      </div>
    );
  } else if (!isCurrentAuction && settlement) {
    return (
      <div>
        <h2>Past Auction</h2>
        <p>Noun ID: {nounId}</p>
        <p>Winning Bid: {formatEther(settlement.amount)} ETH</p>
        <p>Winner: {settlement.winner}</p>
        <p>
          Settlement Time:{' '}
          {new Date(Number(settlement.blockTimestamp) * 1000).toLocaleString()}
        </p>
      </div>
    );
  } else if (!isCurrentAuction && !settlement) {
    return (
      <div>
        <h2>Past Auction</h2>
        <p>Noun ID: {nounId}</p>
        <p>Settlement data not available</p>
      </div>
    );
  } else {
    return <div>Loading auction information...</div>;
  }
};

export default AuctionInfo;
