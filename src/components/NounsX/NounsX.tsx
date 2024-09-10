import React, { useEffect } from 'react';
import styles from './NounsX.module.css';

interface TwitterTimelineProps {
  height?: number;
  maxHeight?: number;
  theme?: 'light' | 'dark';
}

const NounsX: React.FC<TwitterTimelineProps> = ({ height = 625, maxHeight, theme = 'dark' }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className={styles.twitterTimelineWrapper} 
      style={{ height: `${height}px`, maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
    >
      <a
        className="twitter-timeline"
        data-height={height}
        data-theme={theme}
        href="https://twitter.com/nounsdao?ref_src=twsrc%5Etfw"
      >
        Tweets by nounsdao
      </a>
    </div>
  );
};

export default NounsX;