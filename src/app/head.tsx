import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // other metadata can be omitted here; not required
};

export default function Head() {
  return (
    <>
      {/* Android Chrome theme color */}
      <meta name="theme-color" content="#1e3a8a" />
      {/* Manifest for PWA */}
      <link rel="manifest" href="/manifest.json" />
      {/* Mobile web app capable */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </>
  );
}
