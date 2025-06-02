import { User } from '@/domains/entities/User';
import { UserId } from '@/domains/value-objects/UserId';
import { Email } from '@/domains/value-objects/Email';
import { IUserRepository } from '@/adapters/IUserRepository';

// In-memory implementation for now
export class UserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    // Sample data
    const sampleUsers = [
      new User('550e8400-e29b-41d4-a716-446655440001', '太郎', 'taro@example.com', new Date(), new Date()),
      new User('550e8400-e29b-41d4-a716-446655440002', '花子', 'hanako@example.com', new Date(), new Date()),
      new User('550e8400-e29b-41d4-a716-446655440003', '次郎', 'jiro@example.com', new Date(), new Date())
    ];
    
    sampleUsers.forEach(user => {
      this.users.set(user.getId(), user);
    });
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.get(id.getValue()) || null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail() === email.getValue()) {
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

  async delete(id: UserId): Promise<void> {
    this.users.delete(id.getValue());
  }
}