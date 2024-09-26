/*
Events:
- ArtUpdated(art: address)
- BaseURIUpdated(baseURI: string)
- DataURIToggled(enabled: bool)
- OwnershipTransferred(previousOwner: address, newOwner: address)
- PartsLocked()
- RendererUpdated(renderer: address)

Writable Functions:
- addAccessories(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- addAccessoriesFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- addBackground(_background: string)
- addBodies(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- addBodiesFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- addGlasses(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- addGlassesFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- addHeads(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- addHeadsFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- addManyBackgrounds(_backgrounds: string[])
- lockParts()
- renounceOwnership()
- setArt(_art: address)
- setArtDescriptor(descriptor: address)
- setArtInflator(inflator: address)
- setBaseURI(_baseURI: string)
- setPalette(paletteIndex: uint8, palette: bytes)
- setPalettePointer(paletteIndex: uint8, pointer: address)
- setRenderer(_renderer: address)
- toggleDataURIEnabled()
- transferOwnership(newOwner: address)
- updateAccessories(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- updateAccessoriesFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- updateBodies(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- updateBodiesFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- updateGlasses(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- updateGlassesFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)
- updateHeads(encodedCompressed: bytes, decompressedLength: uint80, imageCount: uint16)
- updateHeadsFromPointer(pointer: address, decompressedLength: uint80, imageCount: uint16)

Readable Functions:
- accessories(index: uint256) -> bytes
- accessoryCount() -> uint256
- arePartsLocked() -> bool
- art() -> address
- backgroundCount() -> uint256
- backgrounds(index: uint256) -> string
- baseURI() -> string
- bodies(index: uint256) -> bytes
- bodyCount() -> uint256
- dataURI(tokenId: uint256, seed: INounsSeeder.Seed) -> string
- generateSVGImage(seed: INounsSeeder.Seed) -> string
- genericDataURI(name: string, description: string, seed: INounsSeeder.Seed) -> string
- getPartsForSeed(seed: INounsSeeder.Seed) -> ISVGRenderer.Part[]
- glasses(index: uint256) -> bytes
- glassesCount() -> uint256
- headCount() -> uint256
- heads(index: uint256) -> bytes
- isDataURIEnabled() -> bool
- owner() -> address
- palettes(index: uint8) -> bytes
- renderer() -> address
- tokenURI(tokenId: uint256, seed: INounsSeeder.Seed) -> string
*/

// Contract Address: 0x79E04ebCDf1ac2661697B23844149b43acc002d5

export const NounsDescriptorSepoliaABI = [
  {
    inputs: [
      {
        internalType: 'contract INounsArt',
        name: '_art',
        type: 'address',
      },
      {
        internalType: 'contract ISVGRenderer',
        name: '_renderer',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'BadPaletteLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyPalette',
    type: 'error',
  },
  {
    inputs: [],
    name: 'IndexNotFound',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract INounsArt',
        name: 'art',
        type: 'address',
      },
    ],
    name: 'ArtUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
    ],
    name: 'BaseURIUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'DataURIToggled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PartsLocked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract ISVGRenderer',
        name: 'renderer',
        type: 'address',
      },
    ],
    name: 'RendererUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'accessories',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'accessoryCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'encodedCompressed',
        type: 'bytes',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addAccessories',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pointer',
        type: 'address',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addAccessoriesFromPointer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_background',
        type: 'string',
      },
    ],
    name: 'addBackground',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'encodedCompressed',
        type: 'bytes',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addBodies',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pointer',
        type: 'address',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addBodiesFromPointer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'encodedCompressed',
        type: 'bytes',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addGlasses',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pointer',
        type: 'address',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addGlassesFromPointer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'encodedCompressed',
        type: 'bytes',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addHeads',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pointer',
        type: 'address',
      },
      {
        internalType: 'uint80',
        name: 'decompressedLength',
        type: 'uint80',
      },
      {
        internalType: 'uint16',
        name: 'imageCount',
        type: 'uint16',
      },
    ],
    name: 'addHeadsFromPointer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: '_backgrounds',
        type: 'string[]',
      },
    ],
    name: 'addManyBackgrounds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'arePartsLocked',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'art',
    outputs: [
      {
        internalType: 'contract INounsArt',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'backgroundCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
    ],
    name: 'baseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'backgrounds',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bodies',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bodiesCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dataURIEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'glasses',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'glassesCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'heads',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'headsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'palette',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: '_palette',
        type: 'string[]',
      },
    ],
    name: 'setPalette',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISVGRenderer',
        name: 'renderer',
        type: 'address',
      },
    ],
    name: 'setRenderer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract INounsArt',
        name: 'art',
        type: 'address',
      },
    ],
    name: 'setArt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setDataURIEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'togglePartsLock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
