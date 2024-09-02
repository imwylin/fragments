import React, { useState } from 'react';
import { useReadContract } from 'wagmi';
import { NounsAuctionHouseABI } from '../../abi/NounsAuctionHouse';
import AuctionNavigation from './AuctionNavigation/AuctionNavigation';
import AuctionInfo from './Auctioninfo/AuctionInfo';
import NounImage from './NounImage';

interface AuctionData {
  nounId: bigint;
  amount: bigint;
  startTime: bigint;
  endTime: bigint;
  bidder: string;
  settled: boolean;
}

const Auction: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#E1D7D5');

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <div style={{ backgroundColor, padding: '20px', minHeight: '100vh' }}>
      <AuctionNavigation>
        {(nounId) => (
          <>
            <NounImage
              nounId={nounId}
              onBackgroundColorChange={handleBackgroundColorChange}
            />
            <AuctionInfo nounId={nounId} />
          </>
        )}
      </AuctionNavigation>
    </div>
  );
};

export default Auction;
