import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Navbar from '../components/NavBar/NavBar';
import JapaneseNoggles from '../art/japanesenoggles';
import Infographic from '../components/Protocol/Infographic';

const Home: NextPage = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#343235');
  const [currentNounId, setCurrentNounId] = useState<bigint>(BigInt(0));

  const handleColorExtracted = (color: string) => {
    setBackgroundColor(color);
  };

  const handleNounIdChange = (nounId: bigint) => {
    setCurrentNounId(nounId);
  };

  return (
    <div className={styles.pageWrapper} style={{ backgroundColor }}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.infographicContainer}>
          <Infographic />
        </div>
        <div className={styles.japaneseNogglesContainer}>
          <JapaneseNoggles />
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.subtitle}>play Nouns</p>
        <p className={styles.emoji}>💎</p>
      </footer>
    </div>
  );
};

export default Home;
