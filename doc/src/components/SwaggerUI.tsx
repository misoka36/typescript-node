import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function SwaggerUI() {
  return (
    <BrowserOnly>
      {() => (
        <iframe
          src="/swagger-ui.html"
          style={{
            width: '100%',
            height: '800px',
            border: 'none',
          }}
          title="Swagger UI"
        />
      )}
    </BrowserOnly>
  );
}