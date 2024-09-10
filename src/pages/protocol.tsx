import React from 'react';
import styles from '../styles/Home.module.css';
import Navbar from '../components/NavBar/NavBar';
import Infographic from '../components/Protocol/Infographic';

const ProtocolPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main>
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

export default ProtocolPage;
