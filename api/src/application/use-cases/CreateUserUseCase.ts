import { IUserRepository } from '@/adapters/IUserRepository';
import { User } from '@/domains/entities/User';
import { UserId } from '@/domains/value-objects/UserId';
import { Email } from '@/domains/value-objects/Email';

export interface CreateUserInput {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    // Validate email
    const email = new Email(input.email);
    
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const userId = new UserId();
    const now = new Date();
    const user = new User(
      userId.getValue(),
      input.name,
      email.getValue(),
      now,
      now
    );

    // Save user
    await this.userRepository.save(user);

    return user;
  }
}