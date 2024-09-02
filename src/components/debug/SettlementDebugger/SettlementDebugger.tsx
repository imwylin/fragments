import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { NounsAuctionHouseABI } from '../../../abi/NounsAuctionHouse';
import classes from './SettlementDebugger.module.css';

const AUCTION_HOUSE_ADDRESS = '0x830BD73E4184ceF73443C15111a1DF14e495C706';

interface Settlement {
  blockTimestamp: number;
  amount: bigint;
  winner: `0x${string}`;
  nounId: bigint;
  clientId: number;
}

interface ContractCallState {
  startId: string;
  endId: string;
  skipEmpty: boolean;
}

const bigIntSerializer = (key: string, value: any) => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

const SettlementDebugger: React.FC = () => {
  const [startId, setStartId] = useState<string>('');
  const [endId, setEndId] = useState<string>('');
  const [skipEmpty, setSkipEmpty] = useState<boolean>(true);
  const [inputError, setInputError] = useState<string | null>(null);
  const [contractCallState, setContractCallState] =
    useState<ContractCallState | null>(null);

  console.log('Component rendering. contractCallState:', contractCallState);

  const {
    data: settlementData,
    isError,
    error,
    isLoading,
  } = useReadContract(
    contractCallState
      ? {
          address: AUCTION_HOUSE_ADDRESS,
          abi: NounsAuctionHouseABI,
          functionName: 'getSettlements',
          args: [
            BigInt(contractCallState.startId),
            BigInt(contractCallState.endId),
            contractCallState.skipEmpty,
          ],
        }
      : {
          address: AUCTION_HOUSE_ADDRESS,
          abi: NounsAuctionHouseABI,
          functionName: 'getSettlements',
        }
  );

  useEffect(() => {
    console.log('useReadContract hook values changed:');
    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('settlementData:', settlementData);
    console.log('error:', error);
  }, [isLoading, isError, settlementData, error]);

  const handleFetch = () => {
    console.log('handleFetch called');
    if (startId && endId) {
      const start = BigInt(startId);
      const end = BigInt(endId);
      if (start > end) {
        setInputError('Start ID must be less than or equal to End ID');
        setContractCallState(null);
        return;
      }
      setInputError(null);
      console.log('Setting contractCallState');
      setContractCallState({ startId, endId, skipEmpty });
    } else {
      setInputError('Both Start ID and End ID are required');
      setContractCallState(null);
    }
  };

  const renderSettlementData = () => {
    if (!settlementData || !Array.isArray(settlementData)) {
      return <p>No valid settlement data available.</p>;
    }

    return (
      <div className={classes.dataSection}>
        <h3 className={classes.dataTitle}>Settlement Data:</h3>
        {settlementData.length === 0 ? (
          <p>No settlements found for the given range.</p>
        ) : (
          settlementData.map((settlement: Settlement, index: number) => (
            <div key={index} className={classes.settlementItem}>
              <h4 className={classes.settlementTitle}>
                Settlement {index + 1}
              </h4>
              <p className={classes.settlementData}>
                Block Timestamp: {settlement.blockTimestamp}
              </p>
              <p className={classes.settlementData}>
                Amount: {settlement.amount.toString()}
              </p>
              <p className={classes.settlementData}>
                Winner: {settlement.winner}
              </p>
              <p className={classes.settlementData}>
                Noun ID: {settlement.nounId.toString()}
              </p>
              <p className={classes.settlementData}>
                Client ID: {settlement.clientId}
              </p>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className={classes.debuggerWrapper}>
      <h2 className={classes.debuggerTitle}>Settlement Data Debugger</h2>
      <div className={classes.inputGroup}>
        <label className={classes.inputLabel}>
          Start ID:
          <input
            type="number"
            value={startId}
            onChange={(e) => setStartId(e.target.value)}
            className={classes.input}
          />
        </label>
      </div>
      <div className={classes.inputGroup}>
        <label className={classes.inputLabel}>
          End ID:
          <input
            type="number"
            value={endId}
            onChange={(e) => setEndId(e.target.value)}
            className={classes.input}
          />
        </label>
      </div>
      <div className={classes.inputGroup}>
        <label className={classes.inputLabel}>
          <input
            type="checkbox"
            checked={skipEmpty}
            onChange={(e) => setSkipEmpty(e.target.checked)}
            className={classes.checkbox}
          />
          Skip Empty
        </label>
      </div>
      {inputError && <p className={classes.errorMessage}>{inputError}</p>}
      <button onClick={handleFetch} className={classes.button}>
        Fetch Settlement Data
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && contractCallState && (
        <div className={classes.errorMessage}>
          <p>Error fetching data:</p>
          <pre className={classes.pre}>
            {JSON.stringify(error, bigIntSerializer, 2)}
          </pre>
        </div>
      )}
      {contractCallState && !isError && renderSettlementData()}
      {contractCallState && (
        <div className={classes.dataSection}>
          <h3 className={classes.dataTitle}>Debug Information:</h3>
          <p>Contract Address: {AUCTION_HOUSE_ADDRESS}</p>
          <p>Function: getSettlements</p>
          <p>Start ID: {contractCallState.startId}</p>
          <p>End ID: {contractCallState.endId}</p>
          <p>Skip Empty: {contractCallState.skipEmpty.toString()}</p>
          <p>
            Args:{' '}
            {JSON.stringify(
              [
                contractCallState.startId,
                contractCallState.endId,
                contractCallState.skipEmpty,
              ],
              null,
              2
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default SettlementDebugger;
