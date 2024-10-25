import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.subtitle}>
        <a
          href="https://github.com/imwylin/fragments"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Nouns
        </a>
        . cc0 no rights reserved
      </p>
      <p className={styles.emoji}>
        <a
          href="https://warpcast.com/wylin"
          target="_blank"
          rel="noopener noreferrer"
        >
          💎
        </a>
      </p>
    </footer>
  );
};

export default Footer;
