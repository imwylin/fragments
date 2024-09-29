import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Navbar from '../components/NavBar/NavBar';
import AuctionNoun from '../components/AuctionNoun/AuctionNoun';
import NounsX from '../components/NounsX/NounsX';
import ResponsiveIframe from '../components/ResponsiveIframe/ResponsiveIframe';
import JapaneseNoggles from '../art/japanesenoggles';
import Footer from '../components/Footer/Footer';

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
        <div className={styles.contentRow}>
          <div className={styles.nounsXContainer}>
            <NounsX height={565} theme="dark" />
          </div>
          <div className={styles.iframeContainer}>
            <ResponsiveIframe
              src="https://www.nouns.game/crystal-ball"
              title="Crystal Ball"
              height="565px"
            />
          </div>
        </div>
        <div className={styles.japaneseNogglesContainer}>
          <JapaneseNoggles />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
