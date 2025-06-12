import React from 'react';

export default function Redoc() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Redoc</h2>
      <p>API documentation with clean, responsive interface</p>
      <a
        href="/redoc.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        Open Redoc in New Tab
      </a>
    </div>
  );
}