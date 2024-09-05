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
  const [isAuctionSettled, setIsAuctionSettled] = useState(false);

  const {
    data: auctionData,
    isError,
    isLoading,
  } = useReadContract({
    address: AUCTION_HOUSE_ADDRESS,
    abi: NounsAuctionHouseABI,
    functionName: 'auction',
  }) as { data: AuctionData | undefined; isError: boolean; isLoading: boolean };

  const { writeContract: bidOnAuction } = useWriteContract();
  const { writeContract: settleAuction } = useWriteContract();

  useEffect(() => {
    if (auctionData && !isLoading && !isError) {
      setIsAuctionSettled(auctionData.settled);
    }
  }, [auctionData, isLoading, isError]);

  const handleBidSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bidOnAuction || !auctionData) return;
    try {
      const result = await bidOnAuction({
        address: AUCTION_HOUSE_ADDRESS,
        abi: NounsAuctionHouseABI,
        functionName: 'createBid',
        args: [auctionData.nounId, 11], // Pass the nounId and clientId 11 as arguments
        value: parseEther(bidAmount),
      });
      console.log('Bid submitted successfully', result);
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  const handleSettleAuction = async () => {
    if (!settleAuction) return;
    try {
      const result = await settleAuction({
        address: AUCTION_HOUSE_ADDRESS,
        abi: NounsAuctionHouseABI,
        functionName: 'settleAuction',
      });
      console.log('Auction settled successfully', result);
    } catch (error) {
      console.error('Error settling auction:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching auction data</div>;

  return (
    <div className={classes.container}>
      {isAuctionSettled ? (
        <button className={classes.button} onClick={handleSettleAuction}>
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
      )}
    </div>
  );
};

export default AuctionButton;
