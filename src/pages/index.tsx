import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Navbar from '../components/NavBar/NavBar';
import AuctionNoun from '../components/AuctionNoun/AuctionNoun';
import Infographic from '../components/Protocol/Infographic';
import JapaneseNoggles from '../art/japanesenoggles';

const Home: NextPage = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#343235');
  const [currentNounId, setCurrentNounId] = useState<bigint>(BigInt(0));
  const [extractedColor, setExtractedColor] = useState<string>('#343235');

  const handleNounIdChange = useCallback((nounId: bigint) => {
    setCurrentNounId(nounId);
  }, []);

  const handleColorExtracted = (color: string) => {
    setBackgroundColor(color);
    setExtractedColor(color);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.main}>
        <AuctionNoun
          onColorExtracted={handleColorExtracted}
          onNounIdChange={handleNounIdChange}
          extractedColor={extractedColor}
        />
        <div className={styles.japaneseNogglesContainer}>
          <JapaneseNoggles />
        </div>
        <div className={styles.infographicContainer}>
          <Infographic />
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.subtitle}>fragments. cc0 no rights reserved</p>
        <p className={styles.emoji}>💎</p>
      </footer>
    </div>
  );
};

export default Home;
