// src/components/DebuggingComponent.tsx
import React, { useState, useEffect } from 'react';

const DebuggingComponent: React.FC = () => {
  const [nounData, setNounData] = useState<any>(null);
  const [partData, setPartData] = useState<any>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nounData'); // Ensure the endpoint matches your API route
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        console.log('Data:', data);

        if (data.error) throw new Error(data.error);

        setNounData(data.nounData || null);
        setPartData(data.partData || null);
        setSvg(data.svg || null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Debugging Component</h1>
      {error && <p>Error: {error}</p>}
      <div>
        <h2>Noun Data</h2>
        <pre>{JSON.stringify(nounData, null, 2)}</pre>
      </div>
      <div>
        <h2>Part Data</h2>
        <pre>{JSON.stringify(partData, null, 2)}</pre>
      </div>
      <div>
        <h2>SVG Output</h2>
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <p>Loading SVG...</p>
        )}
      </div>
    </div>
  );
};

export default DebuggingComponent;
