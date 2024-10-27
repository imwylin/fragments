import type { NextApiRequest, NextApiResponse } from 'next';
import { buildSVG } from '@nouns/sdk';
import { ImageData } from '@nouns/assets';

const { bgcolors, palette, images } = ImageData;
const { bodies, accessories, heads, glasses } = images;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { seed, isNextNoun, blockNumber } = req.body;

    // Ensure seed is provided and valid
    if (!seed || typeof seed !== 'object') {
      console.error('Invalid seed in the request body');
      return res.status(400).json({ error: 'Valid seed object is required' });
    }

    console.log('Received seed:', seed, 'isNextNoun:', isNextNoun, 'blockNumber:', blockNumber);

    let modifiedSeed = { ...seed };

    if (isNextNoun && blockNumber) {
      // Use blockNumber to modify the seed when it's the next Noun
      const blockNumberSeed = BigInt(blockNumber) % BigInt(256); // Assuming each trait has 256 options max
      modifiedSeed = {
        background: (seed.background + Number(blockNumberSeed)) % bgcolors.length,
        body: (seed.body + Number(blockNumberSeed)) % bodies.length,
        accessory: (seed.accessory + Number(blockNumberSeed)) % accessories.length,
        head: (seed.head + Number(blockNumberSeed)) % heads.length,
        glasses: (seed.glasses + Number(blockNumberSeed)) % glasses.length,
      };
    }

    // Prepare the parts for buildSVG
    const svgParts = [
      { data: bodies[modifiedSeed.body].data },
      { data: accessories[modifiedSeed.accessory].data },
      { data: heads[modifiedSeed.head].data },
      { data: glasses[modifiedSeed.glasses].data },
    ];

    const background = bgcolors[modifiedSeed.background];

    const svgImage = buildSVG(svgParts, palette, background);
    console.log('SVG generated successfully');

    res.status(200).json({ svg: svgImage });
  } catch (error: any) {
    console.error('Error generating SVG:', error);
    res
      .status(500)
      .json({ error: 'Error generating SVG', details: error.message });
  }
}