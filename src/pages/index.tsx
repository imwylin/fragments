import { useState } from 'react';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import Navbar from '../components/NavBar/NavBar';
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
      </main>
      <footer className={styles.footer}>
        <p className={styles.subtitle}>play Nouns</p>
        <p className={styles.emoji}>💎</p>
      </footer>
    </div>
  );
};

export default Home;
