import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Redoc() {
  return (
    <BrowserOnly>
      {() => (
        <iframe
          src="/redoc.html"
          style={{
            width: '100%',
            height: '800px',
            border: 'none',
          }}
          title="Redoc"
        />
      )}
    </BrowserOnly>
  );
}