import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from './ConnectButton/ConnectButton';
import TreasuryBalance from './TreasuryBalance/TreasuryBalance';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Your Logo"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <TreasuryBalance />
        <div className={styles.sandwichMenuContainer}>
          <div className={styles.sandwichMenu} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {showMenu && (
            <div className={`${styles.menuDropdown} ${styles.mobileMenuDropdown}`}>
              <div className={styles.linksSection}>
                <Link
                  href="https://nouns.world/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playNounsLink}
                >
                  Explore 🌐
                </Link>
                <Link
                  href="https://nouns.game/vote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playNounsLink}
                >
                  Play 🕹️
                </Link>
                <div className={styles.connectButton}>
                  <ConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.desktopLinksSection}>
        <Link
          href="https://nouns.world/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.playNounsLink}
        >
          Explore Nouns 🌐
        </Link>
        <Link
          href="https://nouns.game/vote"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.playNounsLink}
        >
          Play Nouns 🕹️
        </Link>
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;