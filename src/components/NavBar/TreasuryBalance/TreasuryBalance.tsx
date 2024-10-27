import React, { useState, useRef, useEffect } from 'react';
import { useBalance } from 'wagmi';
import styles from './TreasuryBalance.module.css';

const TREASURY_ADDRESS = '0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71';

const TOKENS = [
  { symbol: 'ETH', address: undefined },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`,
  },
  {
    symbol: 'STETH',
    address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' as `0x${string}`,
  },
  {
    symbol: 'rETH',
    address: '0xae78736cd615f374d3085123a210448e74fc6393' as `0x${string}`,
  },
  {
    symbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
  },
  {
    symbol: 'wstETH',
    address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0' as `0x${string}`,
  },
];

interface TokenPrices {
  [key: string]: number;
}

const TreasuryBalance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleInteraction = (isHovering: boolean) => {
    if (!isMobile) {
      setIsOpen(isHovering);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        // Fetch prices from an API (e.g., CoinGecko)
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,staked-ether,rocket-pool-eth,wrapped-steth&vs_currencies=usd'
        );
        const data = await response.json();
        setTokenPrices({
          ETH: data.ethereum.usd,
          WETH: data.ethereum.usd,
          STETH: data['staked-ether'].usd,
          rETH: data['rocket-pool-eth'].usd,
          wstETH: data['wrapped-steth'].usd,
          USDC: 1, // USDC is a stablecoin, so we assume 1 USDC = 1 USD
        });
      } catch (error) {
        console.error('Error fetching token prices:', error);
      }
    };

    fetchTokenPrices();
  }, []);

  const formatNumber = (value: string, decimals: number = 2) => {
    const number = parseFloat(value);
    return number.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const calculateTotalUSD = (balances: any[]) => {
    return balances.reduce((sum, token) => {
      if (token.isLoading || token.isError) return sum;

      const balance = parseFloat(token.balance?.formatted || '0');
      const price = tokenPrices[token.symbol] || 0;

      return sum + balance * price;
    }, 0);
  };

  const balances = TOKENS.map((token) => {
    const { data, isError, isLoading } = useBalance({
      address: TREASURY_ADDRESS as `0x${string}`,
      token: token.address,
    });

    return { ...token, balance: data, isError, isLoading };
  });

  const mainBalance = balances[0]; // ETH balance

  return (
    <div
      ref={containerRef}
      className={styles.treasuryContainer}
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
    >
      <button
        onClick={handleClick}
        className={styles.treasuryButton}
      >
        Treasury:{' '}
        {mainBalance.isLoading
          ? 'Loading...'
          : mainBalance.isError
            ? 'Error'
            : `${formatNumber(mainBalance.balance?.formatted || '0')} Ξ`}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {isMobile && (
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              &times;
            </button>
          )}
          {balances.map((token, index) => (
            <div key={index} className={styles.dropdownItem}>
              {token.symbol}:{' '}
              {token.isLoading
                ? 'Loading...'
                : token.isError
                  ? 'Error'
                  : token.symbol === 'USDC'
                    ? `$${formatNumber(token.balance?.formatted || '0')}`
                    : `${formatNumber(token.balance?.formatted || '0')}`}
            </div>
          ))}
          <div className={styles.divider}></div>
          <div className={styles.dropdownItem}>
            Total: ${formatNumber(calculateTotalUSD(balances).toString(), 2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasuryBalance;
