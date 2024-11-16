import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '@youApp/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.repository.find({
      relations: { author: true },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: { author: true },
    });
  }
}
