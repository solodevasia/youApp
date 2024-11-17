import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LoginField,
  registerField,
  RegisterField,
} from '@youApp/dto/user/user.dto';
import UserEntity from '@youApp/entities/user/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { AuthorField } from '@youApp/dto/author/author.dto';
import AuthorEntity from '@youApp/entities/author/author.entity';
import { Zodiac } from '@youApp/types/zodiac';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async created(body: RegisterField) {
    const findOne = await this.repository.findOne({
      where: [{ username: body.username }, { email: body.email }],
    });
    if (findOne) {
      throw new HttpException(
        {
          message: 'Username or email already exists.',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (registerField.safeParse(body).error?.errors) {
      throw new HttpException(
        {
          message: "Password don't match, please check again",
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    delete body.confirmation;
    const create = this.repository.create(body);
    await this.repository.save(create);
    return { message: 'Account has been created', status: HttpStatus.CREATED };
  }

  async login(body: LoginField) {
    const findOne = await this.repository.findOne({
      where: [{ username: body.token }, { email: body.token }],
    });
    if (!findOne) {
      throw new HttpException(
        {
          message: 'Username or password inccorect',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!bcrypt.compareSync(body.password, findOne.password)) {
      throw new HttpException(
        {
          message: 'Username or password inccorect',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const accessToken = this.jwtService.sign(
      JSON.parse(JSON.stringify(findOne)),
      {
        secret: fs.readFileSync(join(__dirname, '../../../jwtRS256.key'), {
          encoding: 'utf-8',
        }),
      },
    );
    return {
      accessToken,
      status: HttpStatus.OK,
    };
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    let findOne = await this.repository.findOne({
      where: { id },
      relations: { author: true },
    });

    const path = file?.path?.split('/assets');
    const avatar = path ? path[1] : findOne?.author?.avatar;

    if (!findOne.author) {
      const author = this.authorRepository.create({ avatar });
      findOne.author = author;
      await this.repository.manager.save([author, findOne]);
      findOne = await this.repository.findOne({
        where: { id },
        relations: { author: true },
      });
    }
    findOne.author.avatar = avatar;
    await this.repository.manager.save([findOne, findOne.author]);
    return { path: findOne.author.avatar, status: HttpStatus.OK };
  }

  async updated(id: number, body: AuthorField, file: Express.Multer.File) {
    let author: AuthorEntity;
    let findOne = await this.repository.findOne({
      where: { id },
      relations: { author: true },
    });
    const path = file?.path?.split('/assets');
    const avatar = path ? path[1] : findOne.author?.avatar || '';
    if (!findOne?.author) {
      author = this.authorRepository.create({
        ...body,
        horoscope: Zodiac[body.horoscope],
        zodiac: Zodiac[body.zodiac],
        avatar,
      });
      findOne.author = author;
      await this.repository.manager.save([findOne, author]);
      findOne = await this.repository.findOne({
        where: { id },
        relations: { author: true },
      });
    }
    findOne.author.gender = body.gender || findOne.author.gender;
    findOne.author.nickname = body.nickname || findOne.author.nickname;
    findOne.author.birthday = body.birthday || findOne.author.birthday;
    findOne.author.height = body.height || findOne.author.height;
    findOne.author.weight = body.weight || findOne.author.weight;
    findOne.author.about = body.about || findOne.author.about;
    findOne.author.interest = body.interest || findOne.author.interest;
    findOne.author.zodiac = Zodiac[body.zodiac] || findOne.author.zodiac;
    findOne.author.horoscope =
      Zodiac[body.horoscope] || findOne.author.horoscope;
    if (avatar) {
      findOne.author.avatar = avatar;
    }
    await this.repository.manager.save([findOne, findOne.author]);
    return { message: 'Account has been updated', status: HttpStatus.OK };
  }
}
