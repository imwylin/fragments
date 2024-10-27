import React, { useState, useEffect } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { NounsAuctionHouseABI } from '../../abis/NounsAuctionHouse';
import classes from './AuctionButton.module.css';

const AUCTION_HOUSE_ADDRESS = '0x830BD73E4184ceF73443C15111a1DF14e495C706';

interface AuctionData {
  nounId: bigint;
  amount: bigint;
  startTime: number;
  endTime: number;
  bidder: string;
  settled: boolean;
}

const AuctionButton = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [isAuctionOver, setIsAuctionOver] = useState(false);
  const [lastValidAuctionData, setLastValidAuctionData] = useState<AuctionData | null>(null);

  const {
    data: auctionData,
    isError,
    isPending,
    isFetching,
    refetch
  } = useReadContract({
    address: AUCTION_HOUSE_ADDRESS,
    abi: NounsAuctionHouseABI,
    functionName: 'auction',
  }) as { 
    data: AuctionData | undefined; 
    isError: boolean; 
    isPending: boolean;
    isFetching: boolean;
    refetch: () => Promise<any>;
  };

  useEffect(() => {
    if (auctionData && !isPending && !isFetching) {
      setLastValidAuctionData(auctionData);
    }
  }, [auctionData, isPending, isFetching]);

  useEffect(() => {
    if (!lastValidAuctionData || isPending || isFetching) return;

    const checkAuctionStatus = async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const auctionEndTime = Number(lastValidAuctionData.endTime);
      const timeRemaining = auctionEndTime - currentTime;

      if (timeRemaining <= 300 || timeRemaining <= 0) {
        refetch();
      }

      setIsAuctionOver(currentTime > auctionEndTime);
    };

    checkAuctionStatus();

    const intervalId = setInterval(checkAuctionStatus, 6000);

    return () => clearInterval(intervalId);
  }, [lastValidAuctionData, isPending, isFetching, refetch]);

  const { writeContract: bidOnAuction } = useWriteContract();
  const { writeContract: settleAuction } = useWriteContract();

  const handleBidSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bidOnAuction || !lastValidAuctionData) return;
    try {
      const result = await bidOnAuction({
        address: AUCTION_HOUSE_ADDRESS,
        abi: NounsAuctionHouseABI,
        functionName: 'createBid',
        args: [lastValidAuctionData.nounId, 11],
        value: parseEther(bidAmount),
      });
      console.log('Bid submitted successfully', result);
    } catch (error) {
      console.error('Error submitting bid:', error);
    } finally {
      setBidAmount('');
    }
  };

  const handleSettleAuction = async () => {
    if (!settleAuction) return;
    try {
      const result = await settleAuction({
        address: AUCTION_HOUSE_ADDRESS,
        abi: NounsAuctionHouseABI,
        functionName: 'settleCurrentAndCreateNewAuction',
      });
      console.log('Auction settled successfully', result);
    } catch (error) {
      console.error('Error settling auction:', error);
    }
  };

  return (
    <div className={classes.container}>
      {lastValidAuctionData ? (
        isAuctionOver ? (
          <button className={classes.settleButton} onClick={handleSettleAuction}>
            Settle Auction
          </button>
        ) : (
          <form onSubmit={handleBidSubmit} className={classes.form}>
            <input
              type="text"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="0.000000000000069420Ξ"
              className={classes.input}
            />
            <button type="submit" className={classes.button}>
              Bid
            </button>
          </form>
        )
      ) : (
        <div>Loading auction data...</div>
      )}
    </div>
  );
};

export default AuctionButton;