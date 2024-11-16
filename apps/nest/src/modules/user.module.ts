import { Module } from '@nestjs/common';
import UserController from '@youApp/controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
})
export default class UserModule {}
