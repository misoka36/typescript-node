import React from 'react';

export default function SwaggerUI() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Swagger UI</h2>
      <p>API documentation with interactive interface</p>
      <a
        href="/swagger-ui.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        Open Swagger UI in New Tab
      </a>
    </div>
  );
}