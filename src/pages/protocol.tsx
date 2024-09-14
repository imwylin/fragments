import React from 'react';
import styles from '../styles/Home.module.css';
import Navbar from '../components/NavBar/NavBar';
import Infographic from '../components/Protocol/Infographic';
import NounDeposit from '../components/Protocol/NounDeposit/NounDeposit';
import Footer from '../components/Footer/Footer';

const ProtocolPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main>
      <NounDeposit />
        <div className={styles.infographicContainer}>
          <Infographic />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProtocolPage;
