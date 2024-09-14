// Events
// event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
// event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
// event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)
// event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance)
// event DescriptorLocked()
// event DescriptorUpdated(contract INounsDescriptorMinimal descriptor)
// event MinterLocked()
// event MinterUpdated(address minter)
// event NounBurned(uint256 indexed tokenId)
// event NounCreated(uint256 indexed tokenId, INounsSeeder.Seed seed)
// event NoundersDAOUpdated(address noundersDAO)
// event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
// event SeederLocked()
// event SeederUpdated(contract INounsSeeder seeder)
// event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)

// Writable Functions
// function approve(address to, uint256 tokenId) external
// function burn(uint256 nounId) external
// function delegate(address delegatee) external
// function delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s) external
// function lockDescriptor() external
// function lockMinter() external
// function lockSeeder() external
// function mint() external returns (uint256)
// function renounceOwnership() external
// function safeTransferFrom(address from, address to, uint256 tokenId) external
// function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata _data) external
// function setApprovalForAll(address operator, bool approved) external
// function setContractURIHash(string calldata newContractURIHash) external
// function setDescriptor(address _descriptor) external
// function setMinter(address _minter) external
// function setNoundersDAO(address _noundersDAO) external
// function setSeeder(address _seeder) external
// function transferOwnership(address newOwner) external
// function transferFrom(address from, address to, uint256 tokenId) external

// Readable Functions
// function balanceOf(address owner) external view returns (uint256)
// function tokenByIndex(uint256 index) external view returns (uint256)
// function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)
// function DELEGATION_TYPEHASH() external view returns (bytes32)
// function DOMAIN_TYPEHASH() external view returns (bytes32)
// function checkpoints(address, uint32) external view returns (uint32 fromBlock, uint96 votes)
// function contractURI() external view returns (string memory)
// function dataURI(uint256 tokenId) external view returns (string memory)
// function decimals() external view returns (uint8)
// function delegates(address delegator) external view returns (address)
// function descriptor() external view returns (contract INounsDescriptorMinimal)
// function getApproved(uint256 tokenId) external view returns (address)
// function getCurrentVotes(address account) external view returns (uint96)
// function getPriorVotes(address account, uint256 blockNumber) external view returns (uint96)
// function isApprovedForAll(address owner, address operator) external view returns (bool)
// function isDescriptorLocked() external view returns (bool)
// function isMinterLocked() external view returns (bool)
// function isSeederLocked() external view returns (bool)
// function minter() external view returns (address)
// function name() external view returns (string memory)
// function nonces(address) external view returns (uint256)
// function noundersDAO() external view returns (address)
// function numCheckpoints(address) external view returns (uint32)
// function owner() external view returns (address)
// function ownerOf(uint256 tokenId) external view returns (address)
// function proxyRegistry() external view returns (contract IProxyRegistry)
// function seeder() external view returns (contract INounsSeeder)
// function seeds(uint256) external view returns (uint48 background, uint48 body, uint48 accessory, uint48 head, uint48 glasses)
// function symbol() external view returns (string memory)
// function tokenURI(uint256 tokenId) external view returns (string memory)
// function totalSupply() external view returns (uint256)
// function votesToDelegate(address delegator) external view returns (uint96)

// Contract Address: 0x4C4674bb72a096855496a7204962297bd7e12b85

export const NounsTokenSpoliaABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "_noundersDAO", "type": "address" },
        { "internalType": "address", "name": "_minter", "type": "address" },
        { "internalType": "contract INounsDescriptorMinimal", "name": "_descriptor", "type": "address" },
        { "internalType": "contract INounsSeeder", "name": "_seeder", "type": "address" },
        { "internalType": "contract IProxyRegistry", "name": "_proxyRegistry", "type": "address" }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "approved", "type": "address" },
        { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "operator", "type": "address" },
        { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "delegator", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }
      ],
      "name": "DelegateChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "delegate", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" },
        { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }
      ],
      "name": "DelegateVotesChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "DescriptorLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "contract INounsDescriptorMinimal", "name": "descriptor", "type": "address" }
      ],
      "name": "DescriptorUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "MinterLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "minter", "type": "address" }
      ],
      "name": "MinterUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "NounBurned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        {
          "components": [
            { "internalType": "uint48", "name": "background", "type": "uint48" },
            { "internalType": "uint48", "name": "body", "type": "uint48" },
            { "internalType": "uint48", "name": "accessory", "type": "uint48" },
            { "internalType": "uint48", "name": "head", "type": "uint48" },
            { "internalType": "uint48", "name": "glasses", "type": "uint48" }
          ],
          "indexed": false,
          "internalType": "struct INounsSeeder.Seed",
          "name": "seed",
          "type": "tuple"
        }
      ],
      "name": "NounCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "noundersDAO", "type": "address" }
      ],
      "name": "NoundersDAOUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "SeederLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "contract INounsSeeder", "name": "seeder", "type": "address" }
      ],
      "name": "SeederUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
        { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DELEGATION_TYPEHASH",
      "outputs": [
        { "internalType": "bytes32", "name": "", "type": "bytes32" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DOMAIN_TYPEHASH",
      "outputs": [
        { "internalType": "bytes32", "name": "", "type": "bytes32" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "balanceOf",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "nounId", "type": "uint256" }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" },
        { "internalType": "uint32", "name": "", "type": "uint32" }
      ],
      "name": "checkpoints",
      "outputs": [
        { "internalType": "uint32", "name": "fromBlock", "type": "uint32" },
        { "internalType": "uint96", "name": "votes", "type": "uint96" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractURI",
      "outputs": [
        { "internalType": "string", "name": "", "type": "string" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "descriptor",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "descriptor",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        { "internalType": "bool", "name": "", "type": "bool" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isNoundersDAO",
      "outputs": [
        { "internalType": "bool", "name": "", "type": "bool" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "delegate", "type": "address" }
      ],
      "name": "delegates",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "getApproved",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllNouns",
      "outputs": [
        {
          "components": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
            { "internalType": "uint256", "name": "creator", "type": "uint256" },
            { "internalType": "uint256", "name": "minted", "type": "uint256" }
          ],
          "internalType": "struct INounsSeeder.Noun[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "getNoun",
      "outputs": [
        {
          "components": [
            { "internalType": "uint48", "name": "background", "type": "uint48" },
            { "internalType": "uint48", "name": "body", "type": "uint48" },
            { "internalType": "uint48", "name": "accessory", "type": "uint48" },
            { "internalType": "uint48", "name": "head", "type": "uint48" },
            { "internalType": "uint48", "name": "glasses", "type": "uint48" }
          ],
          "internalType": "struct INounsSeeder.Seed",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "getNoun",
      "outputs": [
        {
          "components": [
            { "internalType": "uint48", "name": "background", "type": "uint48" },
            { "internalType": "uint48", "name": "body", "type": "uint48" },
            { "internalType": "uint48", "name": "accessory", "type": "uint48" },
            { "internalType": "uint48", "name": "head", "type": "uint48" },
            { "internalType": "uint48", "name": "glasses", "type": "uint48" }
          ],
          "internalType": "struct INounsSeeder.Seed",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "getOwnership",
      "outputs": [
        { "internalType": "bool", "name": "", "type": "bool" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "getSeed",
      "outputs": [
        {
          "components": [
            { "internalType": "uint48", "name": "background", "type": "uint48" },
            { "internalType": "uint48", "name": "body", "type": "uint48" },
            { "internalType": "uint48", "name": "accessory", "type": "uint48" },
            { "internalType": "uint48", "name": "head", "type": "uint48" },
            { "internalType": "uint48", "name": "glasses", "type": "uint48" }
          ],
          "internalType": "struct INounsSeeder.Seed",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "getTotalSupply",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "name": "noundersDAO",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "spender", "type": "address" }
      ],
      "name": "allowance",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [
        { "internalType": "bool", "name": "", "type": "bool" }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "getTotalSupply",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  