import React from 'react';
import classes from './AuctionNoun.module.css';

const ProbeNounsLink: React.FC = () => {
  return (
    <div className={classes.probeNounsContainer}>
      <a href="https://probe.wtf" target="_blank" rel="noopener noreferrer" className={classes.probeNounsLink}>
        Probe Nouns
      </a>
      <img src="/probe.png" alt="Probe Logo" className={classes.probeLogo} />
    </div>
  );
};

export default ProbeNounsLink;