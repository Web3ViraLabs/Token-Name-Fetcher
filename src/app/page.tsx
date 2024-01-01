// pages/index.tsx
'use client';
import { useState, FormEvent } from 'react';
import fetchTokenName from './lib/fetchTokenName';

const HomePage = () => {
  // State for storing the user input and fetched token name
  const [contractAddress, setContractAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle the form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setTokenName('');

    try {
      const name = await fetchTokenName(contractAddress);
      setTokenName(name);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to fetch the token name. Please check the contract address and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          borderRadius: '10px',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Token Name Fetcher</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter Contract Address"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              color: 'black', // Ensure text is black
              backgroundColor: 'white', // Ensuring background is white for better contrast
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Fetch Token Name
          </button>
        </form>

        {isLoading && <p>Loading...</p>}

        {tokenName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ margin: 0 }}>Token Name:</h2>
            <p style={{ margin: 0 }}>{tokenName}</p>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {/* Footer */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '10px 20px',
          position: 'absolute',
          bottom: 0,
          borderTop: '1px solid #e7e7e7', // A subtle top border
        }}
      >
        <p style={{ margin: 0 }}>Developed by Viralabs</p>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
