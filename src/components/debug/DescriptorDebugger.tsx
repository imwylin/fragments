import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import dynamic from 'next/dynamic';

// Dynamically import the parts of the SDK we need
const { NounsDescriptorABI, ChainId } = dynamic(() => import('@nouns/sdk'), {
  ssr: false,
});

// Use an environment variable for the chain ID
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
  ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  : ChainId.Mainnet;

const DescriptorDebugger: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [descriptorAddress, setDescriptorAddress] = useState<
    `0x${string}` | null
  >(null);

  useEffect(() => {
    // Fetch the contract addresses
    fetch(`/api/getContractAddresses?chainId=${CHAIN_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setDescriptorAddress(data.nounsDescriptor as `0x${string}`);
      })
      .catch((error) =>
        console.error('Error fetching contract addresses:', error)
      );
  }, []);

  const { data: backgroundData } = useReadContract({
    address: descriptorAddress,
    abi: NounsDescriptorABI,
    functionName: 'backgrounds',
    args: [BigInt(index)],
  });

  const { data: bodyData } = useReadContract({
    address: descriptorAddress,
    abi: NounsDescriptorABI,
    functionName: 'bodies',
    args: [BigInt(index)],
  });

  const { data: accessoryData } = useReadContract({
    address: descriptorAddress,
    abi: NounsDescriptorABI,
    functionName: 'accessories',
    args: [BigInt(index)],
  });

  const { data: headData } = useReadContract({
    address: descriptorAddress,
    abi: NounsDescriptorABI,
    functionName: 'heads',
    args: [BigInt(index)],
  });

  const { data: glassesData } = useReadContract({
    address: descriptorAddress,
    abi: NounsDescriptorABI,
    functionName: 'glasses',
    args: [BigInt(index)],
  });

  const { data: paletteData } = useReadContract({
    address: descriptorAddress,
    abi: NounsDescriptorABI,
    functionName: 'palettes',
    args: [index],
  });

  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setIndex(isNaN(value) ? 0 : value);
  };

  const renderData = (label: string, data: any) => (
    <div style={{ marginBottom: '20px' }}>
      <h3>{label}</h3>
      <pre>
        {JSON.stringify(
          data,
          (_, v) => (typeof v === 'bigint' ? v.toString() : v),
          2
        )}
      </pre>
    </div>
  );

  if (!descriptorAddress) {
    return <div>Loading contract addresses...</div>;
  }

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <h1>Nouns Descriptor Debugger</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Index:
          <input
            type="number"
            value={index}
            onChange={handleIndexChange}
            min="0"
          />
        </label>
      </div>
      {renderData('Background', backgroundData)}
      {renderData('Body', bodyData)}
      {renderData('Accessory', accessoryData)}
      {renderData('Head', headData)}
      {renderData('Glasses', glassesData)}
      {renderData('Palette', paletteData)}
    </div>
  );
};

export default DescriptorDebugger;
