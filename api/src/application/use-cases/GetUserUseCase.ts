import { IUserRepository } from '@/adapters/IUserRepository';
import { UserId } from '@/domains/value-objects/UserId';
import { User } from '@/domains/entities/User';

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User | null> {
    const id = new UserId(userId);
    return await this.userRepository.findById(id);
  }
}