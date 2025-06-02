import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import { setupRoutes } from './routes';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger());

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }));

// Setup API routes
setupRoutes(app);

// Root route
app.get('/', (c) => {
  return c.json({ 
    message: 'API Server is running',
    version: '1.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users'
    ]
  });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});