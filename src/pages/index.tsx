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
      <div className={styles.banner}>
        <h1>Nouns is a game. Play it your way.</h1>
      </div>
      <main className={styles.main}>
        <AuctionNoun
          onColorExtracted={handleColorExtracted}
          onNounIdChange={handleNounIdChange}
          extractedColor={extractedColor}
        />
        <div className={styles.rulesBanner}>
          <h1>There are only 5 rules.</h1>
          <p>Do good with no expectation of return</p>
          <p>Create positive externalities</p>
          <p>Embrace absurdity & difference</p>
          <p>Teach people about Nouns & crypto</p>
          <p>Have fun</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
