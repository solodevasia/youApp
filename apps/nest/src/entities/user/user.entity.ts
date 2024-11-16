import {
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import AuthorEntity from '../author/author.entity';

@Entity({
  name: 'user',
  schema: 'authenticates',
})
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'bigint', nullable: false })
  created_at: number;

  @Column({ type: 'bigint', nullable: false })
  updated_at: number;

  @OneToOne(() => AuthorEntity)
  @JoinColumn()
  author: AuthorEntity;

  @BeforeInsert()
  async beforeInsert() {
    this.created_at = new Date().getTime();
    this.updated_at = new Date().getTime();
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @AfterUpdate()
  afterUpdate() {
    this.updated_at = new Date().getTime();
  }
}
