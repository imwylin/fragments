// Events
// Approval(address owner, address approved, uint256 tokenId)
// ApprovalForAll(address owner, address operator, bool approved)
// NounFTCreated(uint256 tokenId, INounsSeeder.Seed seed, uint256 fragmentCount)
// NounFTUpdated(uint256 tokenId, uint256 oldFragmentCount, uint256 newFragmentCount)
// OwnershipTransferred(address previousOwner, address newOwner)
// Transfer(address from, address to, uint256 tokenId)
// DescriptorUpdated(address descriptor)

// Writable Functions
// approve(address to, uint256 tokenId)
// mint(address to, uint256 fragmentCount, uint256 tokenSeedToUse)
// mint(address to, uint256 fragmentCount)
// updateFragmentCount(uint256 tokenId, uint256 newFragmentCount)
// transferFrom(address from, address to, uint256 tokenId)
// safeTransferFrom(address from, address to, uint256 tokenId)
// safeTransferFrom(address from, address to, uint256 tokenId, bytes data)
// burn(uint256 tokenId)
// setApprovalForAll(address operator, bool approved)
// setDescriptor(address _descriptor)
// transferOwnership(address newOwner)
// renounceOwnership()

// Readable Functions
// nextTokenId() → uint256
// ownerOf(uint256 tokenId) → address
// balanceOf(address owner) → uint256
// fragmentCountOf(uint256 tokenId) → uint256
// dataURI(uint256 tokenId) → string
// tokenURI(uint256 tokenId) → string
// seeds(uint256 tokenId) → (uint48 background, uint48 body, uint48 accessory, uint48 head, uint48 glasses)
// getApproved(uint256 tokenId) → address
// isApprovedForAll(address owner, address operator) → bool
// nounsToken() → address
// symbol() → string
// name() → string
// owner() → address
// proxyRegistry() → address
// descriptor() → address
// supportsInterface(bytes4 interfaceId) → bool

// Contract Address: 0x661290d6F8C8490419cD5d92f01D507F402189c1

export const NounsFragmentTokenABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "initialOwner",
          "type": "address"
        },
        {
          "internalType": "contract INounsFragmentDescriptorMinimal",
          "name": "_descriptor",
          "type": "address"
        },
        {
          "internalType": "contract INounsToken",
          "name": "_nounsToken",
          "type": "address"
        },
        {
          "internalType": "contract IProxyRegistry",
          "name": "_proxyRegistry",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721IncorrectOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721InsufficientApproval",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOperator",
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
      "name": "ERC721InvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721NonexistentToken",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "contract INounsFragmentDescriptorMinimal",
          "name": "descriptor",
          "type": "address"
        }
      ],
      "name": "DescriptorUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint48",
              "name": "background",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "body",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "accessory",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "head",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "glasses",
              "type": "uint48"
            }
          ],
          "indexed": false,
          "internalType": "struct INounsSeeder.Seed",
          "name": "seed",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fragmentCount",
          "type": "uint256"
        }
      ],
      "name": "NounFTCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldFragmentCount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newFragmentCount",
          "type": "uint256"
        }
      ],
      "name": "NounFTUpdated",
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
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "descriptor",
      "outputs": [
        {
          "internalType": "contract INounsFragmentDescriptorMinimal",
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "fragmentCountOf",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "nftFragmentAt",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint48",
              "name": "background",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "body",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "accessory",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "head",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "glasses",
              "type": "uint48"
            }
          ],
          "internalType": "struct INounsSeeder.Seed",
          "name": "",
          "type": "tuple"
        },
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
  