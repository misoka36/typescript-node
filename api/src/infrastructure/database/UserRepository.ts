import { User } from '@/domains/entities/User';
import { IUserRepository } from '@/adapters/IUserRepository';

// In-memory implementation for now
export class UserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    // Sample data
    const sampleUsers = [
      User.reconstruct({
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: '太郎',
        email: 'taro@example.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }),
      User.reconstruct({
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: '花子',
        email: 'hanako@example.com',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      }),
      User.reconstruct({
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: '次郎',
        email: 'jiro@example.com',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03')
      })
    ];
    
    sampleUsers.forEach(user => {
      this.users.set(user.getId(), user);
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase();
    for (const user of this.users.values()) {
      if (user.getEmail() === normalizedEmail) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async save(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}