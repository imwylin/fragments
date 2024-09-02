import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { buildSVG } from '@nouns/sdk';
import {
  NounsDescriptorABI,
  NounsTokenABI,
  getContractAddressesForChainOrThrow,
  ChainId,
} from '@nouns/sdk';

// Assuming you're using Ethereum Mainnet. Adjust if using a different network.
const addresses = getContractAddressesForChainOrThrow(ChainId.Mainnet);

const SVGDebugger: React.FC = () => {
  const [nounId, setNounId] = useState<bigint>(BigInt(0));
  const [svgData, setSvgData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: seed } = useReadContract({
    address: addresses.nounsToken,
    abi: NounsTokenABI,
    functionName: 'seeds',
    args: [nounId],
  });

  const { data: backgroundData } = useReadContract({
    address: addresses.nounsDescriptor,
    abi: NounsDescriptorABI,
    functionName: 'backgrounds',
    args: seed ? [BigInt(seed.background)] : undefined,
  });

  const { data: bodyData } = useReadContract({
    address: addresses.nounsDescriptor,
    abi: NounsDescriptorABI,
    functionName: 'bodies',
    args: seed ? [BigInt(seed.body)] : undefined,
  });

  const { data: accessoryData } = useReadContract({
    address: addresses.nounsDescriptor,
    abi: NounsDescriptorABI,
    functionName: 'accessories',
    args: seed ? [BigInt(seed.accessory)] : undefined,
  });

  const { data: headData } = useReadContract({
    address: addresses.nounsDescriptor,
    abi: NounsDescriptorABI,
    functionName: 'heads',
    args: seed ? [BigInt(seed.head)] : undefined,
  });

  const { data: glassesData } = useReadContract({
    address: addresses.nounsDescriptor,
    abi: NounsDescriptorABI,
    functionName: 'glasses',
    args: seed ? [BigInt(seed.glasses)] : undefined,
  });

  const { data: paletteData } = useReadContract({
    address: addresses.nounsDescriptor,
    abi: NounsDescriptorABI,
    functionName: 'palettes',
    args: [BigInt(0)], // Assuming the main palette is at index 0
  });

  useEffect(() => {
    if (
      seed &&
      backgroundData &&
      bodyData &&
      accessoryData &&
      headData &&
      glassesData &&
      paletteData
    ) {
      try {
        const parts = [
          { data: bodyData as string },
          { data: accessoryData as string },
          { data: headData as string },
          { data: glassesData as string },
        ];
        const background = backgroundData as string;
        const palette = (paletteData as string[]).map((color) =>
          color.slice(2)
        ); // Remove '0x' prefix
        const svg = buildSVG(parts, palette, background);
        setSvgData(svg);
        setError(null);
      } catch (e) {
        setError(`Error building SVG: ${(e as Error).message}`);
        setSvgData(null);
      }
    } else {
      setSvgData(null);
    }
  }, [
    seed,
    backgroundData,
    bodyData,
    accessoryData,
    headData,
    glassesData,
    paletteData,
  ]);

  const handleNounIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNounId(value ? BigInt(value) : BigInt(0));
  };

  const renderSeedData = (seed: any | null) => {
    if (!seed) return <p>No seed data available</p>;
    return (
      <pre>
        {JSON.stringify(
          seed,
          (_, v) => (typeof v === 'bigint' ? v.toString() : v),
          2
        )}
      </pre>
    );
  };

  const renderSVG = () => {
    if (error) return <p>Error: {error}</p>;
    if (!svgData) return <p>No SVG data available</p>;

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: svgData }} />
        <pre>{svgData}</pre>
      </>
    );
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <h1>SVG Debugger</h1>
      <div>
        <label>
          Noun ID:
          <input
            type="number"
            value={nounId.toString()}
            onChange={handleNounIdChange}
            min="0"
          />
        </label>
      </div>
      <div>
        <h3>Noun Seed</h3>
        {renderSeedData(seed)}
      </div>
      <div>
        <h3>SVG Data</h3>
        {renderSVG()}
      </div>
    </div>
  );
};

export default SVGDebugger;
