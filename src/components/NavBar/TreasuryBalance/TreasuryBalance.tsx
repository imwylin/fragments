import { useBalance } from 'wagmi';
import styles from './TreasuryBalance.module.css';

const TreasuryBalance = () => {
  const { data, isError, isLoading } = useBalance({
    address: '0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71',
  });

  if (isLoading) return <div className={styles.treasuryButton}>Loading...</div>;
  if (isError)
    return <div className={styles.treasuryButton}>Error fetching balance</div>;

  const roundedBalance = data ? parseFloat(data.formatted).toFixed(2) : '0.00';

  return (
    <a
      href="https://etherscan.io/address/0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className={styles.treasuryButton}>
        Treasury: {roundedBalance} Ξ
      </button>
    </a>
  );
};

export default TreasuryBalance;
