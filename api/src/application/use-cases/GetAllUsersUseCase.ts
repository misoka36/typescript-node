import { IUserRepository } from '@/adapters/IUserRepository';
import { User } from '@/domains/entities/User';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}