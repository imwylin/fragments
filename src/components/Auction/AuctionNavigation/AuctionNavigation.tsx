import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { NounsAuctionHouseABI } from '../../../abi/NounsAuctionHouse';

interface AuctionData {
  nounId: bigint;
  amount: bigint;
  startTime: bigint;
  endTime: bigint;
  bidder: string;
  settled: boolean;
}

interface AuctionNavigationProps {
  children: (nounId: number) => React.ReactNode;
}

const AuctionNavigation: React.FC<AuctionNavigationProps> = ({ children }) => {
  const [selectedNounId, setSelectedNounId] = useState<number>(0);
  const [inputNounId, setInputNounId] = useState('0');

  const { data: auctionData } = useReadContract({
    address: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    abi: NounsAuctionHouseABI,
    functionName: 'auction',
  }) as { data: AuctionData | undefined };

  const currentAuctionId = auctionData ? Number(auctionData.nounId) : 0;

  useEffect(() => {
    setSelectedNounId(currentAuctionId);
    setInputNounId(currentAuctionId.toString());
  }, [currentAuctionId]);

  const handlePrevious = () => {
    if (selectedNounId > 0) {
      setSelectedNounId(selectedNounId - 1);
    }
  };

  const handleNext = () => {
    if (selectedNounId < currentAuctionId) {
      setSelectedNounId(selectedNounId + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNounId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNounId = parseInt(inputNounId, 10);
    if (!isNaN(newNounId) && newNounId >= 0 && newNounId <= currentAuctionId) {
      setSelectedNounId(newNounId);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevious} disabled={selectedNounId === 0}>
          &lt;
        </button>
        <button
          onClick={handleNext}
          disabled={selectedNounId === currentAuctionId}
        >
          &gt;
        </button>
        <button onClick={() => setSelectedNounId(currentAuctionId)}>
          Return to Auction
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={inputNounId}
            onChange={handleInputChange}
            min="0"
            max={currentAuctionId}
          />
          <button type="submit">Go</button>
        </form>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        {children(selectedNounId)}
      </div>
    </div>
  );
};

export default AuctionNavigation;
