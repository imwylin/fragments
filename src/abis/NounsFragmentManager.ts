// Events
// DepositNouns(uint256[] nounIds, uint256[] fragmentSizes, uint48 availableFromBlock, address to)
// RedeemNouns(uint256 nounsCount, address to)
// VoteDelegated(uint256 fragmentId, address to)
// event Initialized(uint64 version)
// event OwnershipTransferred(address previousOwner, address newOwner)
// event Paused(address account)
// event Unpaused(address account)
// event Upgraded(address implementation)

// Writable Functions
// depositNouns(uint256[] nounIds, uint256[] fragmentSizes) external
// redeemNouns(uint256[] fragmentIds, uint256 fungibleTokenCount, uint256[] targetPositions) external
// combineFragments(uint256[] fragmentIds, uint256 fungibleTokenCount) external
// splitFragment(uint256 primaryFragmentId, uint256[] targetFragmentSizes) external
// castVote(uint256[] fragmentIds, uint256 proposalId, uint8 support, uint32 clientId) external
// castVote(uint256[] fragmentIds, uint256 proposalId, uint8 support) external
// delegateVote(uint256[] fragmentIds, address to) external
// function initialize(address owner, contract INounsToken _nounsToken, contract NounsFragmentToken _nounsFragmentToken, contract NounsFungibleToken _nounsFungibleToken, contract INounsDaoProxy _nounsDaoProxy) external
// function pause() external
// function unpause() external
// function renounceOwnership() external
// function transferOwnership(address newOwner) external
// function upgradeToAndCall(address newImplementation, bytes data) external payable
// function withdrawEth(address payable to) external

// Readable Functions
// allVaults(uint256) external view returns (address)
// nounDepositedIn(address) external view returns (uint256)
// vaultFor(uint256) external view returns (address)
// vaultImplementation() external view returns (address)
// voteCountFor(uint256, uint256) external view returns (uint256)
// votePowerOwnerOf(uint256 fragmentId) external view returns (address)
// FRAGMENTS_IN_A_NOUN() external view returns (uint256)
// getNounIdAtPosition(uint256 position) external view returns (uint256)
// hasLiveVote(uint256 fragmentId) external view returns (bool)
// hasVotedOn(uint256, uint256) external view returns (bool)
// isDepositLocked(uint256 fragmentId) external view returns (bool)
// nextVoteIndexFor(uint256) external view returns (uint256)
// function UPGRADE_INTERFACE_VERSION() external view returns (string)
// function owner() external view returns (address)
// function paused() external view returns (bool)
// function proxiableUUID() external view returns (bytes32)
// function nounsDaoProxy() external view returns (contract INounsDaoProxy)
// function nounsFragmentToken() external view returns (contract NounsFragmentToken)
// function nounsFungibleToken() external view returns (contract NounsFungibleToken)
// function nounsToken() external view returns (contract INounsToke

// Contract Address: 0x1c83F10AFa8cfd7c48Ba0075682faD0a98Ed7E33

export const NounsFragmentManagerABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "AlreadyVoted",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CanOnlyVoteAgainstDuringObjectionPeriod",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "name": "DepositNotUnlocked",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1167FailedCreateClone",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1967NonPayable",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EnforcedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExpectedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedInnerCall",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "name": "FragmentNotUnlocked",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentSize",
          "type": "uint256"
        },
        {
          "internalType": "uint48",
          "name": "depositSize",
          "type": "uint48"
        }
      ],
      "name": "FragmentSizeExceedsDeposit",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentCount",
          "type": "uint256"
        }
      ],
      "name": "InvalidFragmentCount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "data",
          "type": "uint256"
        }
      ],
      "name": "InvalidInput",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UUPSUnauthorizedCallContext",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "slot",
          "type": "bytes32"
        }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Unauthorized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "VotingPeriodEnded",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroInputSize",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "nounIds",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "fragmentSizes",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint48",
          "name": "availableFromBlock",
          "type": "uint48"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "DepositNouns",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nounsCount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "RedeemNouns",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "VoteDelegated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "FRAGMENTS_IN_A_NOUN",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "UPGRADE_INTERFACE_VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allVaults",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "fragmentIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votingId",
          "type": "uint256"
        }
      ],
      "name": "batchVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentVotingId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNounProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "proposalBlock",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "name": "getProposalData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isPaused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxProposalId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxVotingId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nounsId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "name": "proposalVoteData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "name": "proposalData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endBlock",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reserveNounId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fragmentId",
          "type": "uint256"
        }
      ],
      "name": "votes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  