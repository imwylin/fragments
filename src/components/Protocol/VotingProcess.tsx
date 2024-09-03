// VotingProcess.tsx
import React, { useState } from 'react';
import styles from './VotingProcess.module.css';

interface VotingProcessProps {}

const VotingProcess: React.FC<VotingProcessProps> = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleHover = (section: string | null) => {
    setActiveSection(section);
  };

  return (
    <g
      className={styles.node}
      onMouseEnter={() => handleHover('voting')}
      onMouseLeave={() => handleHover(null)}
    >
      <rect
        x="500"
        y="850"
        width="200"
        height="100"
        rx="10"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <text
        x="600"
        y="900"
        textAnchor="middle"
        fill="white"
        fontSize="14"
      >
        Voting Process
      </text>
      {activeSection === 'voting' && (
        <g className={styles.hoverInfo}>
          <rect
            x="450"
            y="960"
            width="300"
            height="140"
            rx="5"
            fill="rgba(255,255,255,0.1)"
            stroke="white"
          />
          <text
            x="600"
            y="990"
            textAnchor="middle"
            fill="white"
            fontSize="14"
          >
            <tspan x="600" dy="-0.6em">
              Votes rounded down to nearest Million.
            </tspan>
            <tspan x="600" dy="1.2em">
              Each Million = 1 Vaulted Noun vote.
            </tspan>
            <tspan x="600" dy="1.2em">
              For, Against, & Abstain votes cast
            </tspan>
            <tspan x="600" dy="1.2em">
              in real time as they reach 1M.
            </tspan>
            <tspan x="600" dy="1.2em">
              Remaining votes not cast.
            </tspan>
          </text>
        </g>
      )}
    </g>
  );
};

export default VotingProcess;