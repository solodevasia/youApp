import { Zodiac } from '@youApp/types/zodiac';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'author',
  schema: 'authenticates',
})
export default class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({nullable: true})
  gender: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({
    type: 'simple-enum',
    enum: Zodiac,
    nullable: true,
  })
  horoscope: string;

  @Column({
    type: 'simple-enum',
    enum: Zodiac,
    nullable: true,
  })
  zodiac: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ nullable: true })
  interest: string;
}
