import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import UserModule from '@youApp/modules/user.module';
import * as supertest from 'supertest';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app.getHttpServer()).toBeDefined());

  it('should call api "/user/created"', async () =>
    await supertest(app.getHttpServer())
      .post('/user/created')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(HttpStatus.CREATED)
      .expect('Created'));

  it('should call api "/user/login/access"', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login/access')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(HttpStatus.OK)
      .expect('Login'));

  it('should call api "/user/profile/updated"', async () =>
    await supertest(app.getHttpServer())
      .put('/user/profile/updated')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(HttpStatus.OK)
      .expect('Updated'));

  it('should call api "/user/profile"', async () =>
    await supertest(app.getHttpServer())
      .get('/user/profile')
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.OK)
      .expect('Profile'));
});
