import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from '@youApp/controllers/user/user.controller';
import AuthorEntity from '@youApp/entities/author/author.entity';
import UserEntity from '@youApp/entities/user/user.entity';
import UserRepository from '@youApp/repository/user/user.repository';
import UserService from '@youApp/services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AuthorEntity])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export default class UserModule {}
