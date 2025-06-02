import { Hono } from 'hono';
import { z } from 'zod';
import { GetUserUseCase } from '@/application/use-cases/GetUserUseCase';
import { GetAllUsersUseCase } from '@/application/use-cases/GetAllUsersUseCase';
import { CreateUserUseCase } from '@/application/use-cases/CreateUserUseCase';
import { IUserRepository } from '@/adapters/IUserRepository';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

export class UserHandler {
  private app: Hono;

  constructor(private readonly userRepository: IUserRepository) {
    this.app = new Hono();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Get all users
    this.app.get('/', async (c) => {
      try {
        const useCase = new GetAllUsersUseCase(this.userRepository);
        const users = await useCase.execute();
        
        const response = users.map(user => ({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt()
        }));

        return c.json(response);
      } catch (error) {
        return c.json({ error: 'Failed to fetch users' }, 500);
      }
    });

    // Get user by ID
    this.app.get('/:id', async (c) => {
      try {
        const userId = c.req.param('id');
        const useCase = new GetUserUseCase(this.userRepository);
        const user = await useCase.execute(userId);

        if (!user) {
          return c.json({ error: 'User not found' }, 404);
        }

        return c.json({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt()
        });
      } catch (error) {
        return c.json({ error: 'Invalid user ID format' }, 400);
      }
    });

    // Create user
    this.app.post('/', async (c) => {
      try {
        const body = await c.req.json();
        const validatedData = createUserSchema.parse(body);

        const useCase = new CreateUserUseCase(this.userRepository);
        const user = await useCase.execute(validatedData);

        return c.json({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt()
        }, 201);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return c.json({ error: 'Invalid input', details: error.errors }, 400);
        }
        if (error instanceof Error) {
          return c.json({ error: error.message }, 400);
        }
        return c.json({ error: 'Failed to create user' }, 500);
      }
    });
  }

  getApp(): Hono {
    return this.app;
  }
}