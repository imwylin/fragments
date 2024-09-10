import React, { useState, useRef, useEffect } from 'react';
import { useBalance } from 'wagmi';
import styles from './TreasuryBalance.module.css';

const TREASURY_ADDRESS = '0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71';

// Define the tokens you want to display
const TOKENS = [
  { symbol: 'ETH', address: undefined },
  { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}` },
  { symbol: 'STETH', address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' as `0x${string}` },
  { symbol: 'rETH', address: '0xae78736cd615f374d3085123a210448e74fc6393' as `0x${string}` },
  { symbol: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}` },
  { symbol: 'wstETH', address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0' as `0x${string}` },
];

const TreasuryBalance = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const formatNumber = (value: string, decimals: number = 2) => {
    const number = parseFloat(value);
    return number.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const balances = TOKENS.map(token => {
    const { data, isError, isLoading } = useBalance({
      address: TREASURY_ADDRESS as `0x${string}`,
      token: token.address,
    });

    return { ...token, balance: data, isError, isLoading };
  });

  const mainBalance = balances[0]; // ETH balance

  return (
    <div 
      className={styles.treasuryContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <a
        ref={buttonRef}
        href={`https://etherscan.io/address/${TREASURY_ADDRESS}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.treasuryButton}
      >
        Treasury: {mainBalance.isLoading ? 'Loading...' : 
          mainBalance.isError ? 'Error' : 
          `${formatNumber(mainBalance.balance?.formatted || '0')} Ξ`}
      </a>
      {isHovering && (
        <div className={styles.dropdown} style={{ width: `${dropdownWidth}px` }}>
          {balances.map((token, index) => (
            <div key={index} className={styles.dropdownItem}>
              {token.symbol}: {token.isLoading ? 'Loading...' : 
                token.isError ? 'Error' : 
                token.symbol === 'USDC' ?
                  `$${formatNumber(token.balance?.formatted || '0')}` :
                  `${formatNumber(token.balance?.formatted || '0')}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreasuryBalance;