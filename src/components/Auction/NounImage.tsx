import React, { useEffect } from 'react';
import { useNounSVG } from '../../utils/SVGRender';

interface NounImageProps {
  nounId: number;
  onBackgroundColorChange: (color: string) => void;
}

const NounImage: React.FC<NounImageProps> = ({
  nounId,
  onBackgroundColorChange,
}) => {
  const svgString = useNounSVG(nounId);

  useEffect(() => {
    if (svgString) {
      // Extract background color from SVG
      const bgColorMatch = svgString.match(/fill="(#[0-9A-Fa-f]{6})"/);
      if (bgColorMatch && bgColorMatch[1]) {
        onBackgroundColorChange(bgColorMatch[1]);
      }
    }
  }, [svgString, onBackgroundColorChange]);

  return (
    <div>
      <h2>Noun {nounId}</h2>
      {svgString ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgString }}
          style={{ width: '320px', height: '320px' }}
        />
      ) : (
        <p>Loading Noun...</p>
      )}
    </div>
  );
};

export default NounImage;
