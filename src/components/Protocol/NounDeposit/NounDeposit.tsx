import React, { useState, useEffect, useRef } from 'react';
import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { Address, Abi } from 'viem';
import { NounsTokenSpoliaABI } from '../../../abis/NounsTokenSepolia';
import { NounsFragmentManagerABI } from '../../../abis/NounsFragmentManager';
import SafeImage from '/Safe.png';
import styles from './NounDeposit.module.css';

interface Seed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

const NOUNS_TOKEN_ADDRESS = '0x4C4674bb72a096855496a7204962297bd7e12b85' as const;
const NOUNS_FRAGMENT_MANAGER_ADDRESS = '0x1c83F10AFa8cfd7c48Ba0075682faD0a98Ed7E33' as const;

// Ensure the ABI is correctly typed
const typedNounsTokenABI = NounsTokenSpoliaABI as unknown as Abi;
const typedNounsFragmentManagerABI = NounsFragmentManagerABI as unknown as Abi;

const NounDeposit: React.FC = () => {
  const [selectedNoun, setSelectedNoun] = useState<bigint | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showFragmentSizes, setShowFragmentSizes] = useState<boolean>(false);
  const [nounSVGs, setNounSVGs] = useState<Record<string, string>>({});
  const popupRef = useRef<HTMLDivElement>(null);

  const { address } = useAccount();

  const { data: balance, isError: balanceError, isLoading: balanceLoading } = useReadContract({
    address: NOUNS_TOKEN_ADDRESS,
    abi: typedNounsTokenABI,
    functionName: 'balanceOf',
    args: [address ?? '0x0' as Address],
  });

  const { data: tokenIds, isError: tokenIdsError, isLoading: tokenIdsLoading } = useReadContracts({
    contracts: balance && address ? Array.from({ length: Number(balance) }, (_, i: number) => ({
      address: NOUNS_TOKEN_ADDRESS,
      abi: typedNounsTokenABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, BigInt(i)],
    })) : [],
  });

  const ownedNouns = tokenIds
  ?.map(result => (result.status === 'success' ? result.result : null))
  .filter((result): result is bigint => result !== null) ?? [];

  const { data: seeds, isError: seedsError, isLoading: seedsLoading } = useReadContracts({
    contracts: ownedNouns.map((tokenId: bigint) => ({
      address: NOUNS_TOKEN_ADDRESS,
      abi: typedNounsTokenABI,
      functionName: 'seeds',
      args: [tokenId],
    })),
  });

  useEffect(() => {
    const loadNounSVGs = async () => {
      const svgs: Record<string, string> = {};
      for (let i = 0; i < ownedNouns.length; i++) {
        const nounId = ownedNouns[i];
        const seed = seeds?.[i].result as Seed | undefined;
        if (seed) {
          try {
            const response = await fetch('/api/generateSVG', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ seed }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            svgs[nounId.toString()] = `data:image/svg+xml;base64,${btoa(data.svg)}`;
          } catch (error) {
            console.error('Failed to load SVG for Noun', nounId, error);
          }
        }
      }
      setNounSVGs(svgs);
    };

    if (ownedNouns.length > 0 && seeds && seeds.length > 0) {
      loadNounSVGs();
    }
  }, [ownedNouns, seeds]);

  const handleButtonClick = () => {
    if (!selectedNoun) {
      setShowPopup(prevState => !prevState);
    }
  };

  const handleNounSelect = (nounId: bigint) => {
    setSelectedNoun(nounId);
    setShowPopup(false);
    setShowFragmentSizes(true);
  };

  const isLoading = balanceLoading || tokenIdsLoading || seedsLoading;
  const hasError = balanceError || tokenIdsError || seedsError;

  return (
    <>
      <div className={styles.nounDepositWrapper}>
  <button className={styles.nounDepositButton} onClick={handleButtonClick}>
    <span className={styles.buttonText}>
      $⌐◧-◧<br />
      Click Here to<br />
      Vault Your Noun
    </span>
  </button>
</div>
      {showPopup && (
        <div className={styles.nounPopup} ref={popupRef}>
          <h3>Select a Noun to deposit</h3>
          {isLoading && <div className={styles.loading}>Loading Nouns...</div>}
          {hasError && <div className={styles.error}>Error loading Nouns. Please try again.</div>}
          {!isLoading && !hasError && (
            <div className={styles.nounList}>
              {ownedNouns.length === 0 ? (
                <div className={styles.noNouns}>No Nouns found in your wallet</div>
              ) : (
                ownedNouns.map((nounId) => (
                  <div key={nounId.toString()} onClick={() => handleNounSelect(nounId)} className={styles.nounItem}>
                    {nounSVGs[nounId.toString()] ? (
                      <img src={nounSVGs[nounId.toString()]} alt={`Noun ${nounId.toString()}`} className={styles.nounSvg} />
                    ) : (
                      <div className={styles.loadingNoun}>Loading...</div>
                    )}
                    <div className={styles.nounId}>Noun {nounId.toString()}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

interface FragmentSizeSelectorProps {
  nounId: bigint;
}

const FragmentSizeSelector: React.FC<FragmentSizeSelectorProps> = ({ nounId }) => {
  const [fragmentSizes, setFragmentSizes] = useState<number[]>([]);

  const handleSizeChange = (index: number, size: number) => {
    const newSizes = [...fragmentSizes];
    newSizes[index] = size;
    setFragmentSizes(newSizes);
  };

  const { writeContract } = useWriteContract();

  const handleDeposit = () => {
    writeContract({
      address: NOUNS_FRAGMENT_MANAGER_ADDRESS,
      abi: typedNounsFragmentManagerABI,
      functionName: 'depositNouns',
      args: [[nounId], fragmentSizes],
    });
  };

  return (
    <div className={styles.fragmentSizeSelector}>
      <h3>Select Fragment Sizes</h3>
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          type="number"
          value={fragmentSizes[index] || ''}
          onChange={(e) => handleSizeChange(index, parseInt(e.target.value))}
          placeholder={`Size ${index + 1}`}
        />
      ))}
      <button className={styles.depositButton} onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

export default NounDeposit;