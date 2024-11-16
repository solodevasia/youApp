import { Repository } from 'typeorm';
import AuthorEntity from './author.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfiguration } from '@youApp/app.module';
import UserEntity from '../user/user.entity';
import fs from 'fs';
import { join } from 'path';
import { faker } from '@faker-js/faker/.';
import { Zodiac } from '@youApp/types/zodiac';
import dayjs from 'dayjs';

describe('AuthorEntity', () => {
  let exists = fs.readFileSync(join(__dirname, '../../folder/create.txt'), {
    encoding: 'utf-8',
  });
  let userRepository: Repository<UserEntity>;
  let repository: Repository<AuthorEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...typeormConfiguration,
        }),
        TypeOrmModule.forFeature([UserEntity, AuthorEntity]),
      ],
    }).compile();

    const read = fs.readFileSync(join(__dirname, '../../folder/create.txt'), {
      encoding: 'utf-8',
    });

    userRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    repository = moduleRef.get<Repository<AuthorEntity>>(
      getRepositoryToken(AuthorEntity),
    );
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  if (exists) {
    it('updated should to be successfully', async () => {
      const author = repository.create({
        nickname: faker.person.fullName(),
        about: faker.lorem.paragraph(),
        horoscope: Zodiac[faker.person.zodiacSign()],
        zodiac: Zodiac[faker.person.zodiacSign()],
        birthday: dayjs(faker.date.birthdate()).format('DD-MM-YYYY'),
      });
      const findOne = await userRepository.findOne({
        where: { id: JSON.parse(exists).id },
        relations: { author: true },
      });
      findOne['author'] = author;
      await repository.manager.save([findOne, author]);
    });
  }
});
