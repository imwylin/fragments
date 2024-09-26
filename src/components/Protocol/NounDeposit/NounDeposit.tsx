import React, { useState, useEffect, useRef } from 'react';
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { Address, Abi } from 'viem';
import Moralis from 'moralis';
import { NounsTokenSpoliaABI } from '../../../abis/NounsTokenSepolia';
import { NounsFragmentManagerABI } from '../../../abis/NounsFragmentManager';
import styles from './NounDeposit.module.css';

interface Seed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

const NOUNS_TOKEN_ADDRESS =
  '0x4C4674bb72a096855496a7204962297bd7e12b85' as const;
const NOUNS_FRAGMENT_MANAGER_ADDRESS =
  '0x1c83F10AFa8cfd7c48Ba0075682faD0a98Ed7E33' as const;

const typedNounsTokenABI = NounsTokenSpoliaABI as unknown as Abi;
const typedNounsFragmentManagerABI = NounsFragmentManagerABI as unknown as Abi;

const NounDeposit: React.FC = () => {
  const [selectedNoun, setSelectedNoun] = useState<bigint | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showFragmentSizes, setShowFragmentSizes] = useState<boolean>(false);
  const [nounSVGs, setNounSVGs] = useState<Record<string, string>>({});
  const [ownedNouns, setOwnedNouns] = useState<bigint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [showNounList, setShowNounList] = useState<boolean>(true);
  const [fragmentSizes, setFragmentSizes] = useState<number[]>([]);
  const {
    writeContract,
    data: writeData,
    error: writeError,
    isPending: isWritePending,
  } = useWriteContract();
  const [isNounApproved, setIsNounApproved] = useState(false);
  const [approvalHash, setApprovalHash] = useState<`0x${string}` | undefined>();

  const { address } = useAccount();

  const { data: seedsData } = useReadContracts({
    contracts: ownedNouns.map((nounId) => ({
      address: NOUNS_TOKEN_ADDRESS,
      abi: typedNounsTokenABI,
      functionName: 'seeds',
      args: [nounId],
    })),
  });

  const initializeMoralis = async () => {
    const apiKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZmYjFjYjI1LTZlYmMtNDU4OC04YjlmLWE3MTdjMzU1YWY1NyIsIm9yZ0lkIjoiNDA4Mzk1IiwidXNlcklkIjoiNDE5NjQ5IiwidHlwZUlkIjoiNzhiMWZiY2YtMmRhZS00MGIwLThkNGMtNDcxOWI0YTFhYWIzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjYzNDEwNzEsImV4cCI6NDg4MjEwMTA3MX0.EufnkBn1FKfRHRN7EQQjMTAfZrhqyEblbyEoDzrfEO8';

    if (!apiKey) {
      throw new Error('Moralis API key is not set');
    }

    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: apiKey,
      });
    }
  };

  const fetchNounsFromMoralis = async (walletAddress: string) => {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: '0xaa36a7',
      format: 'decimal',
      tokenAddresses: [NOUNS_TOKEN_ADDRESS],
      mediaItems: false,
      address: walletAddress,
    });

    console.log('Moralis API response:', JSON.stringify(response, null, 2));

    return response.result.map((nft) => BigInt(nft.tokenId));
  };

  const fetchNounsFromContract = async (walletAddress: string) => {
    const balanceResponse = await useReadContracts({
      contracts: [
        {
          address: NOUNS_TOKEN_ADDRESS as Address,
          abi: typedNounsTokenABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        },
      ],
    });

    if (
      balanceResponse.status !== 'success' ||
      !balanceResponse.data[0].result
    ) {
      throw new Error('Failed to fetch balance');
    }

    const balance = Number(balanceResponse.data[0].result);
    const nounIds: bigint[] = [];

    for (let i = 0; i < balance; i++) {
      const tokenIdResponse = await useReadContracts({
        contracts: [
          {
            address: NOUNS_TOKEN_ADDRESS as Address,
            abi: typedNounsTokenABI,
            functionName: 'tokenOfOwnerByIndex',
            args: [walletAddress, BigInt(i)],
          },
        ],
      });

      if (
        tokenIdResponse.status === 'success' &&
        tokenIdResponse.data[0].result
      ) {
        nounIds.push(tokenIdResponse.data[0].result as bigint);
      }
    }

    return nounIds;
  };

  useEffect(() => {
    const fetchNounsData = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        await initializeMoralis();
        console.log('Moralis initialized successfully');

        const nounIds = await fetchNounsFromMoralis(address);
        setOwnedNouns(nounIds);
      } catch (moralisError) {
        console.error('Error fetching Nouns from Moralis:', moralisError);
        console.log('Falling back to contract method');

        try {
          const nounIds = await fetchNounsFromContract(address);
          setOwnedNouns(nounIds);
        } catch (contractError) {
          console.error('Error fetching Nouns from contract:', contractError);
          setError('Failed to load Nouns. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNounsData();
  }, [address]);

  useEffect(() => {
    const loadNounSVGs = async () => {
      if (!seedsData) return;

      const svgs: Record<string, string> = {};
      for (let i = 0; i < ownedNouns.length; i++) {
        const nounId = ownedNouns[i];
        const seedResult = seedsData[i];
        if (seedResult.status === 'success') {
          const seed = seedResult.result as Seed;
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
            svgs[nounId.toString()] =
              `data:image/svg+xml;base64,${btoa(data.svg)}`;
          } catch (error) {
            console.error('Failed to load SVG for Noun', nounId, error);
          }
        }
      }
      setNounSVGs(svgs);
    };

    loadNounSVGs();
  }, [ownedNouns, seedsData]);

  const handleButtonClick = () => {
    if (!selectedNoun) {
      setShowPopup((prevState) => !prevState);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowNounList(true);
    setSelectedNoun(null);
  };

  const handleNounSelect = (nounId: bigint) => {
    setSelectedNoun(nounId);
    setShowNounList(false);
  };

  const handleBackToList = () => {
    setShowNounList(true);
    setSelectedNoun(null);
  };

  const handleSizeChange = (index: number, size: number) => {
    const newSizes = [...fragmentSizes];
    newSizes[index] = size;
    setFragmentSizes(newSizes);
  };

  const handleApproveNoun = async () => {
    if (selectedNoun) {
      try {
        await writeContract({
          address: NOUNS_TOKEN_ADDRESS,
          abi: typedNounsTokenABI,
          functionName: 'approve',
          args: [NOUNS_FRAGMENT_MANAGER_ADDRESS, selectedNoun],
        });
      } catch (error) {
        console.error('Error approving Noun:', error);
      }
    }
  };

  useEffect(() => {
    if (writeData) {
      setApprovalHash(writeData);
    }
  }, [writeData]);

  const {
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
  } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });

  useEffect(() => {
    if (isApprovalSuccess) {
      setIsNounApproved(true);
    }
  }, [isApprovalSuccess]);

  return (
    <div className={styles.nounDepositContainer}>
      <div className={styles.nounDepositWrapper}></div>
      {!showPopup ? (
        <button
          className={styles.nounDepositButton}
          onClick={handleButtonClick}
        >
          <span className={styles.buttonText}>
            Click Here to Vault Your Noun
          </span>
        </button>
      ) : (
        <div className={styles.nounPopup} ref={popupRef}>
          <button
            className={styles.closeButton}
            onClick={handleClosePopup}
            aria-label="Close"
          >
            <span>Close</span>
          </button>
          <h3 className={styles.popupHeader}>
            {showNounList
              ? 'Select A Noun to Deposit'
              : `Noun ${selectedNoun?.toString()}`}
          </h3>
          {isLoading && <div className={styles.loading}>Loading Nouns...</div>}
          {error && <div className={styles.error}>{error}</div>}
          {!isLoading && !error && showNounList && (
            <div className={styles.nounList}>
              {ownedNouns
                .slice()
                .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
                .map((nounId) => (
                  <div
                    key={nounId.toString()}
                    onClick={() => handleNounSelect(nounId)}
                    className={styles.nounItem}
                  >
                    <div className={styles.nounId}>
                      Noun {nounId.toString()}
                    </div>
                    {nounSVGs[nounId.toString()] ? (
                      <img
                        src={nounSVGs[nounId.toString()]}
                        alt={`Noun ${nounId.toString()}`}
                        className={styles.nounSvg}
                      />
                    ) : (
                      <div className={styles.loadingNoun}>Loading...</div>
                    )}
                  </div>
                ))}
            </div>
          )}
          {!isLoading && !error && !showNounList && selectedNoun && (
            <>
              <div className={styles.selectedNounContainer}>
                <button
                  className={styles.backButton}
                  onClick={handleBackToList}
                >
                  <span className={styles.backArrow}>←</span>
                  <span className={styles.backText}>Return to List</span>
                </button>
                <img
                  src={nounSVGs[selectedNoun.toString()]}
                  className={styles.selectedNounImage}
                />
              </div>
              {!isNounApproved ? (
                <button
                  className={styles.approveButton}
                  onClick={handleApproveNoun}
                  disabled={isWritePending || isApprovalLoading}
                >
                  {isWritePending
                    ? 'Preparing...'
                    : isApprovalLoading
                      ? 'Approving...'
                      : 'Approve Noun'}
                </button>
              ) : (
                <div className={styles.fragmentSizeSelector}>
                  <div className={styles.inputContainer}>
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="number"
                        value={fragmentSizes[index] || ''}
                        onChange={(e) =>
                          handleSizeChange(index, parseInt(e.target.value))
                        }
                        placeholder={`Size ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button className={styles.depositButton}>Deposit</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NounDeposit;
