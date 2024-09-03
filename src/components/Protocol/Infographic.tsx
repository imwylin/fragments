import React, { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import styles from './Infographic.module.css';

const Infographic: NextPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState('0 0 1200 1200');

  useEffect(() => {
    const updateViewBox = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        const aspect = width / height;
        const viewBoxHeight = 1200 / aspect;
        setViewBox(`0 0 1200 ${viewBoxHeight}`);
      }
    };
    window.addEventListener('resize', updateViewBox);
    updateViewBox();
    return () => window.removeEventListener('resize', updateViewBox);
  }, []);

  const handleHover = (section: string | null) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>$⌐◧-◧ プロトコル</h1>
      <div className={styles.svgContainer}>
        <svg
          className={styles.diagram}
          ref={svgRef}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Noun Holder */}
          <g
            className={styles.node}
            onMouseEnter={() => handleHover('holder')}
            onMouseLeave={() => handleHover(null)}
          >
            <circle
              cx="600"
              cy="100"
              r="60"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text x="600" y="105" textAnchor="middle" fill="white">
              Noun Holder
            </text>
            {activeSection === 'holder' && (
              <g className={styles.hoverInfo}>
                <rect
                  x="280"
                  y="60"
                  width="250"
                  height="80"
                  rx="5"
                  fill="rgba(255,255,255,0.1)"
                  stroke="white"
                />
                <text
                  x="410"
                  y="95"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  <tspan x="410" dy="-0.6em">
                    Any willing Noun holder can deposit
                  </tspan>
                  <tspan x="410" dy="1.2em">
                    Nouns and mint any combination of
                  </tspan>
                  <tspan x="410" dy="1.2em">
                    Fragment Nouns and $⌐◧-◧ tokens.
                  </tspan>
                </text>
              </g>
            )}
          </g>

          {/* Vault */}
          <g
            className={styles.node}
            onMouseEnter={() => handleHover('vault')}
            onMouseLeave={() => handleHover(null)}
          >
            <rect
              x="500"
              y="300"
              width="200"
              height="100"
              rx="10"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text x="600" y="340" textAnchor="middle" fill="white">
              Vault
            </text>
            <text
              x="600"
              y="360"
              textAnchor="middle"
              fill="white"
              fontSize="12"
            >
              (Vaulted Nouns)
            </text>
            {activeSection === 'vault' && (
              <g className={styles.hoverInfo} style={{ zIndex: -1 }}>
                <rect
                  x="280"
                  y="210"
                  width="200"
                  height="100"
                  rx="5"
                  fill="rgba(255,255,255,0.1)"
                  stroke="white"
                />
                <text
                  x="380"
                  y="250"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  <tspan x="380" dy="-0.6em">
                    Each deposited Noun is placed
                  </tspan>
                  <tspan x="380" dy="1.2em">
                    in an individual Vault.
                  </tspan>
                  <tspan x="380" dy="1.2em">
                    Allows participation in governance
                  </tspan>
                  <tspan x="380" dy="1.2em">
                    through Fragment Nouns.
                  </tspan>
                </text>
              </g>
            )}
          </g>

          {/* Central Protocol Gear */}
          <g
            className={styles.node}
            onMouseEnter={() => handleHover('protocol')}
            onMouseLeave={() => handleHover(null)}
          >
            <path
              d="M600 440 L615 470 L585 470 Z M440 600 L470 615 L470 585 Z M760 600 L730 615 L730 585 Z"
              fill="white"
            />
            <circle
              cx="600"
              cy="600"
              r="110"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="600"
              y="610"
              textAnchor="middle"
              fill="white"
              fontSize="18"
            >
              $⌐◧-◧ Protocol
            </text>
            {activeSection === 'protocol' && (
              <g className={styles.hoverInfo}>
                <rect
                  x="475"
                  y="640"
                  width="250"
                  height="80"
                  rx="5"
                  fill="rgba(255,255,255,0.1)"
                  stroke="white"
                />
                <text
                  x="600"
                  y="660"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  <tspan x="600" dy="0.6em">
                    The Protocol Manager,
                  </tspan>
                  <tspan x="600" dy="1.2em">
                    Facilitates deposits, minting,
                  </tspan>
                  <tspan x="600" dy="1.2em">
                    wrapping, merging, and voting.
                  </tspan>
                </text>
              </g>
            )}
          </g>

          {/* Coins */}
          <g
            className={styles.node}
            onMouseEnter={() => handleHover('coins')}
            onMouseLeave={() => handleHover(null)}
          >
            <circle
              cx="300"
              cy="600"
              r="60"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text x="300" y="605" textAnchor="middle" fill="white">
              $⌐◧-◧ Tokens
            </text>
            {activeSection === 'coins' && (
              <g className={styles.hoverInfo}>
                <rect
                  x="30"
                  y="550"
                  width="200"
                  height="100"
                  rx="5"
                  fill="rgba(255,255,255,0.1)"
                  stroke="white"
                />
                <text
                  x="130"
                  y="580"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  <tspan x="130" dy="1.2em">
                    Can be wrapped into Fragments.
                  </tspan>
                  <tspan x="130" dy="1.2em">
                    1M tokens can be swapped
                  </tspan>
                  <tspan x="130" dy="1.2em">
                    for any Vaulted Noun.
                  </tspan>
                </text>
              </g>
            )}
          </g>

          {/* Fragments */}
          <g
            className={styles.node}
            onMouseEnter={() => handleHover('fragments')}
            onMouseLeave={() => handleHover(null)}
          >
            <circle
              cx="900"
              cy="600"
              r="70"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text x="900" y="605" textAnchor="middle" fill="white">
              Fragment Nouns
            </text>
            {activeSection === 'fragments' && (
              <g className={styles.hoverInfo}>
                <rect
                  x="980"
                  y="540"
                  width="180"
                  height="120"
                  rx="5"
                  fill="rgba(255,255,255,0.1)"
                  stroke="white"
                />
                <text
                  x="1070"
                  y="575"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  <tspan x="1070" dy="-0.6em">
                    Wrapped $⌐◧-◧ tokens
                  </tspan>
                  <tspan x="1070" dy="1.2em">
                    Used for fractional voting
                  </tspan>
                  <tspan x="1070" dy="1.2em">
                    Voting power equals
                  </tspan>
                  <tspan x="1070" dy="1.2em">
                    wrapped token amount.
                  </tspan>
                  <tspan x="1070" dy="1.2em">
                    Fragment Nouns can be
                  </tspan>
                  <tspan x="1070" dy="1.2em">
                    merged and unmerged.
                  </tspan>
                </text>
              </g>
            )}
          </g>

          {/* Client Incentives */}
          <g
            className={styles.node}
            onMouseEnter={() => handleHover('incentives')}
            onMouseLeave={() => handleHover(null)}
          >
            <path
              d="M950 160 L850 310 L1050 310 Z"
              fill={
                activeSection === 'incentives'
                  ? 'rgba(255,255,255,0.1)'
                  : 'none'
              }
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="950"
              y="260"
              textAnchor="middle"
              fill="white"
              fontSize="14"
            >
              Client Incentives
            </text>
            {activeSection === 'incentives' && (
              <g className={styles.hoverInfo}>
                <path
                  d="M950 160 L850 310 L1050 310 Z"
                  fill="rgba(255,255,255,0.1)"
                  stroke="white"
                />
                <rect
                  x="850"
                  y="320"
                  width="200"
                  height="60"
                  rx="5"
                  fill="none"
                  stroke="white"
                />
                <text
                  x="950"
                  y="350"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  <tspan x="950" dy="-0.6em">
                    Rewarded for providing
                  </tspan>
                  <tspan x="950" dy="1.2em">
                    voting data to Vaulted Nouns
                  </tspan>
                  <tspan x="950" dy="1.2em">
                    when votes reach X Million.
                  </tspan>
                </text>
              </g>
            )}
          </g>

          {/* Voting Process */}
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

          {/* Arrows */}
          <g className={styles.arrows}>
            <path
              d="M600 170 L600 290"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M600 290 L600 170"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="620" y="225" fill="white" fontSize="14">
              Deposit/ Redeem Noun
            </text>
            <path
              d="M710 300 L850 280"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="725" y="280" fill="white" fontSize="14">
            Auto-Vote
            </text>
            <path
              d="M320 670 Q 600 850 870 675"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <path
              d="M870 675 Q 600 850 320 670"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <text x="580" y="790" fill="white" fontSize="14">
              (Un) Wrap
            </text>
            <path
              d="M490 350 Q 340 390 300 520"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <text x="260" y="410" fill="white" fontSize="14">
              Up to 1 Million
            </text>
            <path
              d="M340 535 Q 470 470 490 390"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <text x="350" y="550" fill="white" fontSize="14">
              Redeem 1 Million
            </text>
            <path
              d="M710 350 Q 860 390 900 520"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <text x="860" y="410" fill="white" fontSize="14">
              Up to 999,999
            </text>
            <path
              d="M840 540 Q 730 470 710 390"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <text x="720" y="550" fill="white" fontSize="14">
              {' '}
              Redeem 1 Million
            </text>
            <path
              d="M860 530 L710 360"
              fill="none"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="800" y="450" fill="white" fontSize="14">
              Vote
            </text>
          </g>

          {/* Arrowhead Marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="white" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Infographic;
