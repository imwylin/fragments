import Image from 'next/image';
import ConnectButton from './ConnectButton/ConnectButton';
import TreasuryBalance from './TreasuryBalance/TreasuryBalance';
import styles from './Navbar.module.css';

const Navbar = () => {
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
      </div>
      <div className={styles.connectButton}>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
