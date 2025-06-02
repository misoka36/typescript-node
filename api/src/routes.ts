import { Hono } from 'hono';
import { UserHandler } from '@/handlers/UserHandler';
import { UserRepository } from '@/infrastructure/database/UserRepository';

export function setupRoutes(app: Hono): void {
  // Initialize repositories
  const userRepository = new UserRepository();

  // Initialize handlers
  const userHandler = new UserHandler(userRepository);

  // Mount routes
  app.route('/api/users', userHandler.getApp());

  // Health check
  app.get('/api/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}