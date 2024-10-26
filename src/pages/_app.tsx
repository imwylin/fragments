import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Primary Meta Tags */}
        <title>Your Web3 App Name</title>
        <meta name="title" content="Play Nouns" />
        <meta name="description" content="Have fun playing Nouns" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://playnouns.wtf" />
        <meta property="og:title" content="Play Nouns" />
        <meta property="og:description" content="Have fun playing Nouns" />
        <meta property="og:image" content="https://yourdapp.com/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://playnouns.wtf" />
        <meta property="twitter:title" content="Play Nouns" />
        <meta property="twitter:description" content="Have fun playing Nouns" />
        <meta property="twitter:image" content="https://yourdapp.com/og-image.png" />
      </Head>

      <ApolloProvider client={client}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              modalSize="compact"
              theme={darkTheme({
                borderRadius: 'small',
                fontStack: 'system',
              })}
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;