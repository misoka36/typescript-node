import { IUserRepository } from '@/adapters/IUserRepository';
import { User } from '@/domains/entities/User';

export interface CreateUserInput {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user (validation happens in the entity)
    const user = User.create({
      name: input.name,
      email: input.email
    });

    // Save user
    await this.userRepository.save(user);

    return user;
  }
}