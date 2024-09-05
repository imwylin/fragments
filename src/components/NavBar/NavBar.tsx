import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from './ConnectButton/ConnectButton';
import TreasuryBalance from './TreasuryBalance/TreasuryBalance';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const togglePlayMenu = () => {
    setIsPlayMenuOpen(!isPlayMenuOpen); // Toggle Play dropdown
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
            <div
              className={`${styles.menuDropdown} ${styles.mobileMenuDropdown}`}
            >
              <div className={styles.linksSection}>
                <Link
                  href="https://nouns.world/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playNounsLink}
                >
                  Explore 🌐
                </Link>
                <div className={styles.playSubMenu}>
                  <div
                    className={styles.playNounsLinkContainer}
                    onClick={togglePlayMenu}
                  >
                    <Link
                      href="https://nouns.game/vote"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.playNounsLink}
                      onClick={togglePlayMenu}
                    >
                      Play 🕹️
                    </Link>
                    {isPlayMenuOpen && (
                      <div className={styles.subMenuLinks}>
                        <Link
                          href="https://nouns.game/crystal-ball"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.subMenuLink}
                        >
                          Crystal Ball 🔮
                        </Link>
                        <Link
                          href="https://www.nouns.game/candidates"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.dropdownLink}
                        >
                          Candidates 💭
                        </Link>
                        <Link
                          href="https://nouns.game/data"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.subMenuLink}
                        >
                          Data 📊
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.connectButton}>
                <ConnectButton />
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
          Explore 🌐
        </Link>
        <div
          className={styles.playMenuContainer}
          onMouseEnter={() => setIsPlayMenuOpen(true)}
          onMouseLeave={() => setIsPlayMenuOpen(false)}
        >
          <Link
            href="https://nouns.game/vote"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.playNounsLink}
          >
            Play 🕹️
          </Link>
          {isPlayMenuOpen && (
            <div className={styles.playDropdown}>
              <Link
                href="https://nouns.game/crystal-ball"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.dropdownLink}
              >
                Crystal Ball 🔮
              </Link>
              <Link
                href="https://www.nouns.game/candidates"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.dropdownLink}
              >
                Candidates 💭
              </Link>
              <Link
                href="https://nouns.game/data"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.dropdownLink}
              >
                Data 📊
              </Link>
            </div>
          )}
        </div>
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
