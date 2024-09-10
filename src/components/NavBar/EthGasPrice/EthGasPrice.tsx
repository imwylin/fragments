import React, { useState, useEffect } from 'react';
import styles from './EthGasPrice.module.css';

const EthPriceGas = () => {
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [averageGasPrice, setAverageGasPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ethPriceResponse = await fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=FYBQKTA9IF438WAQNVWIR1K33W2HJQ6S8A');
        const ethPriceData = await ethPriceResponse.json();
        setEthPrice(parseFloat(ethPriceData.result.ethusd));

        const gasPriceResponse = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=FYBQKTA9IF438WAQNVWIR1K33W2HJQ6S8A');
        const gasPriceData = await gasPriceResponse.json();
        setAverageGasPrice(parseFloat(gasPriceData.result.ProposeGasPrice));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, 60000); // Fetch data every 60 seconds (1 minute)

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div className={styles.ethGasPriceContainer}>
      <div className={styles.ethPrice}>
        <a
          href="https://etherscan.io/chart/etherprice"
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH Price: {ethPrice !== null ? `$${ethPrice.toFixed(2)}` : 'Loading...'}
        </a>
      </div>
      <div className={styles.gasPrice}>
        <a
          href="https://etherscan.io/gastracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gas: {averageGasPrice !== null ? `${averageGasPrice.toFixed(2)}` : 'Loading...'}
        </a>
      </div>
    </div>
  );
};

export default EthPriceGas;