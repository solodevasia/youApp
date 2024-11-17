import { faker } from '@faker-js/faker/.';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfiguration } from '@youApp/app.module';
import UserEntity from '@youApp/entities/user/user.entity';
import UserModule from '@youApp/modules/user.module';
import supertest from 'supertest';
import { IsNull, Not, Repository } from 'typeorm';
import fs from 'fs';
import { join } from 'path';

describe('UserController', () => {
  let app: INestApplication;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: fs.readFileSync(join(__dirname, '../../../jwtRS256.key')),
          signOptions: { expiresIn: '1000s' },
        }),
        TypeOrmModule.forRoot(typeormConfiguration),
        UserModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    repository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    await app.init();
  });

  it('should to be defined', () => expect(app.getHttpServer()).toBeDefined());

  it('should call api "/api/v1/user/created"', async () =>
    await supertest(app.getHttpServer())
      .post('/user/created')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 'password',
        confirmation: 'password',
      })
      .expect(HttpStatus.CREATED)
      .expect({
        message: 'Account has been created',
        status: HttpStatus.CREATED,
      }));

  it('should call api "/api/v1/user/created" email already exists', async () => {
    const findOne = await repository.find({ order: { created_at: 'desc' } });
    await supertest(app.getHttpServer())
      .post('/user/created')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.internet.username(),
        email: findOne[0].email,
        password: 'password',
        confirmation: 'pas',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: 'Username or email already exists.',
        status: HttpStatus.BAD_REQUEST,
      });
  });

  it('should call api "/api/v1/user/created" password don\'t match', async () =>
    await supertest(app.getHttpServer())
      .post('/user/created')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 'password',
        confirmation: 'pas',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: "Password don't match, please check again",
        status: HttpStatus.BAD_REQUEST,
      }));

  it('should call api "/api/v1/user/login/access"', async () => {
    const findOne = await repository.find({ order: { created_at: 'desc' } });
    await supertest(app.getHttpServer())
      .post('/user/login/access')
      .set('Content-Type', 'application/json')
      .send({ token: findOne[0].email, password: 'password' })
      .expect(HttpStatus.OK)
      .then((res) => {
        fs.writeFileSync(
          join(__dirname, '../../folder/token.txt'),
          res.body.accessToken,
        );
        expect(res.body).toEqual({
          accessToken: res.body.accessToken,
          status: HttpStatus.OK,
        });
      });
  });

  it('should call api "/api/v1/user/login/access" with relations', async () => {
    const findOne = await repository.find({
      where: { author: Not(IsNull()) },
      relations: { author: true },
      take: 5,
    });
    await supertest(app.getHttpServer())
      .post('/user/login/access')
      .set('Content-Type', 'application/json')
      .send({ token: findOne[0].username, password: 'password' })
      .expect(HttpStatus.OK)
      .then((res) => {
        fs.writeFileSync(
          join(__dirname, '../../folder/token_with_relations.txt'),
          res.body.accessToken,
        );
        expect(res.body).toEqual({
          accessToken: res.body.accessToken,
          status: HttpStatus.OK,
        });
      });
  });

  it('should call api "/api/v1/user/login/access" account not found', async () => {
    await supertest(app.getHttpServer())
      .post('/user/login/access')
      .set('Content-Type', 'application/json')
      .send({ token: 'not found', password: 'password' })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: 'Username or password inccorect',
        status: HttpStatus.BAD_REQUEST,
      });
  });

  it('should call api "/api/v1/user/login/access" password inccorect', async () => {
    const findOne = await repository.find({ order: { created_at: 'desc' } });
    await supertest(app.getHttpServer())
      .post('/user/login/access')
      .set('Content-Type', 'application/json')
      .send({ token: findOne[0].email, password: 'pord' })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: 'Username or password inccorect',
        status: HttpStatus.BAD_REQUEST,
      });
  });

  it('should call api "/user/profile/updated" create author', async () => {
    const token = fs.readFileSync(join(__dirname, '../../folder/token.txt'), {
      encoding: 'utf-8',
    });
    await supertest(app.getHttpServer())
      .post('/user/profile/updated')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field('nickname', faker.person.fullName())
      .field('birthday', String(faker.date.birthdate()))
      .field('horoscope', faker.person.zodiacSign())
      .field('zodiac', faker.person.zodiacSign())
      .field('height', faker.number.int({ min: 60, max: 180 }))
      .field('weight', faker.number.int({ min: 40, max: 120 }))
      .attach(
        'file',
        join(__dirname, '../../../gnu-debian-linux-wallpaper-preview.jpg'),
      )
      .expect(HttpStatus.OK);
  });

  it('should call api "/user/profile/updated" with relations', async () => {
    const token = fs.readFileSync(
      join(__dirname, '../../folder/token_with_relations.txt'),
      {
        encoding: 'utf-8',
      },
    );
    await supertest(app.getHttpServer())
      .post('/user/profile/updated')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field('nickname', faker.person.fullName())
      .field('birthday', String(faker.date.birthdate()))
      .field('horoscope', faker.person.zodiacSign())
      .field('zodiac', faker.person.zodiacSign())
      .field('height', faker.number.int({ min: 60, max: 180 }))
      .field('weight', faker.number.int({ min: 40, max: 120 }))
      .expect(HttpStatus.OK);
  });

  it('should call api "/api/v1/user/profile"', async () => {
    const token = fs.readFileSync(join(__dirname, '../../folder/token.txt'), {
      encoding: 'utf-8',
    });
    await supertest(app.getHttpServer())
      .get('/user/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(Object.hasOwn(res.body, 'username')).toEqual(true));
  });

  it('should call api "/api/v1/user"', async () => {
    const token = fs.readFileSync(join(__dirname, '../../folder/token.txt'), {
      encoding: 'utf-8',
    });
    await supertest(app.getHttpServer())
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(res.body instanceof Array).toEqual(true));
  });

  it('should call api "/api/v1/user/{id}"', async () => {
    const token = fs.readFileSync(join(__dirname, '../../folder/token.txt'), {
      encoding: 'utf-8',
    });
    const find = await repository.find({ order: { created_at: 'desc' } });
    await supertest(app.getHttpServer())
      .get(`/user/${find[0].id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(Object.hasOwn(res.body, 'username')).toEqual(true));
  });

  it('should call api "/api/v1/user/{id}" unauthorization', async () => {
    const find = await repository.find({ order: { created_at: 'desc' } });
    await supertest(app.getHttpServer())
      .get(`/user/${find[0].id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer }`)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should call api "/api/v1/user/{id}" token is empty', async () => {
    const find = await repository.find({ order: { created_at: 'desc' } });
    await supertest(app.getHttpServer())
      .get(`/user/${find[0].id}`)
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
