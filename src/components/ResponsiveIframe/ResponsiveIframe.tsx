import React from 'react';
import styles from './ResponsiveIframe.module.css';

interface ResponsiveIframeProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
}

const ResponsiveIframe: React.FC<ResponsiveIframeProps> = ({
  src,
  title,
  width = '100%',
  height = '500px',
}) => {
  return (
    <div className={styles.iframeContainer} style={{ width, height }}>
      <iframe
        src={src}
        title={title}
        className={styles.responsiveIframe}
        allowFullScreen
      />
    </div>
  );
};

export default ResponsiveIframe;