import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfiguration } from '@youApp/app.module';
import { faker } from '@faker-js/faker';
import UserEntity from './user.entity';
import { Repository } from 'typeorm';
import fs from 'fs';
import { join } from 'path';

describe('UserEntity', () => {
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...typeormConfiguration,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
    }).compile();

    repository = moduleRef.get(getRepositoryToken(UserEntity));
  });

  it('should create new user', async () => {
    const data = {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: 'password',
    };
    const create = repository.create(data);
    await repository.save(create);
    fs.writeFileSync(
      join(__dirname, '../../folder/create.txt'),
      JSON.stringify(create),
    );
    expect(
      repository.findOne({ where: { username: data.username } }),
    ).not.toEqual(null);
  });

  it('findAll should to be successfully', async () => {
    const findAll = await repository.find();
    expect(findAll.length).not.toEqual(0);
  });

  it('findOne should to be successfully', async () => {
    const findOneLast = await repository.find({
      order: { created_at: 'DESC' },
    });
    const findOne = await repository.findOne({
      where: { username: findOneLast[0].username },
    });
    expect(findOne.created_at).toEqual(findOneLast[0].created_at);
  });

  it('updated should to be successfully', async () => {
    const findOneLast = await repository.find({
      order: { created_at: 'desc' },
    });
    const findOne = await repository.findOne({
      where: { id: findOneLast[0].id },
    });
    findOne.username = `${faker.internet.username()} - updated`;
    await repository.save(findOne);
  });
});
