import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  getUser(id: number) {
    return this.usersRepo.findOne({ where: { id }, relations: ['tasks'] });
  }

  createUser(userData: Partial<User>) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  updateUser(id: number, updateData: Partial<User>) {
    return this.update(id, updateData); // or inline logic
  }

  deleteUser(id: number) {
    return this.usersRepo.delete(id);
  }

  findAll() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  private async update(id: number, updateData: Partial<User>) {
    await this.usersRepo.update(id, updateData);
    return this.getUser(id);
  }
}