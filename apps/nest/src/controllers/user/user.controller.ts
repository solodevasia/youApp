import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorField } from '@youApp/dto/author/author.dto';
import { LoginField, RegisterField } from '@youApp/dto/user/user.dto';
import AuthGuard from '@youApp/middleware/guard';
import UserRepository from '@youApp/repository/user/user.repository';
import UserService from '@youApp/services/user/user.service';
import { CustomRequest } from '@youApp/types/protocol';
import { diskStorage } from '@youApp/utilities/multer';

@Controller('user')
export default class UserController {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: UserService,
  ) {}

  @Post('/created')
  @HttpCode(HttpStatus.CREATED)
  created(@Body() body: RegisterField) {
    return this.service.created(body);
  }

  @Post('/login/access')
  @HttpCode(HttpStatus.OK)
  loginAccess(@Body() body: LoginField) {
    return this.service.login(body);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  currentUser(@Req() req: CustomRequest) {
    return this.repository.findOne(req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  list() {
    return this.repository.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  detail(@Param('id') id: number) {
    return this.repository.findOne(id);
  }

  @Post('/profile/updated')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage }))
  @UseGuards(AuthGuard)
  updated(
    @Req() req: CustomRequest,
    @Body() body: AuthorField,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.service.updated(req.user.id, body, file);
  }

  @Post('/upload/avatar')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage }))
  uploadAvatar(
    @Req() req: CustomRequest,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    console.log(file, '<<<<>');
    return this.service.uploadAvatar(req.user.id, file);
  }
}
