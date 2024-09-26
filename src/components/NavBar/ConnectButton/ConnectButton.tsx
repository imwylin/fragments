import React from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import styles from './ConnectButton.module.css';

const ConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        openChainModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        const formattedBalance = account?.displayBalance
          ? `${parseFloat(account.displayBalance).toFixed(3)} Ξ`
          : '';

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                type="button"
                className={styles.connectButton}
              >
                <div className={styles.buttonContent}>
                  <img
                    src="/wallet.svg"
                    alt="Wallet"
                    width={88}
                    height={44}
                    className={styles.walletIcon}
                  />
                </div>
              </button>
            ) : (
              <div className={styles.connectedButtons}>
                <button
                  onClick={openChainModal}
                  type="button"
                  className={styles.chainButton}
                >
                  {chain?.name || 'Unknown'}
                </button>
                <button
                  onClick={openAccountModal}
                  type="button"
                  className={styles.accountButton}
                >
                  <div className={styles.buttonContent}>
                    <span className={styles.buttonText}>
                      {formattedBalance} {account?.displayName || ''}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};

export default ConnectButton;
