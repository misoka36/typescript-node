import { User } from '@/domains/entities/User';
import { UserId } from '@/domains/value-objects/UserId';
import { Email } from '@/domains/value-objects/Email';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}