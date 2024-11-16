import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

@Controller('user')
export default class UserController {
  @Post('/created')
  @HttpCode(HttpStatus.CREATED)
  created() {
    return 'Created';
  }

  @Post('/login/access')
  @HttpCode(HttpStatus.OK)
  loginAccess() {
    return 'Login';
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  currentUser() {
    return 'Profile';
  }

  @Put('/profile/updated')
  @HttpCode(HttpStatus.OK)
  updated() {
    return 'Updated';
  }
}
