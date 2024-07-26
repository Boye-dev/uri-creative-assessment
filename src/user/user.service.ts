import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOrUpdate(user: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { facebookId: user.facebookId },
    });
    if (existingUser) {
      return this.userRepository.save({ ...existingUser, ...user });
    }
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
