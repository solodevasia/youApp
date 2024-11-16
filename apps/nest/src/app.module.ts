import { Module } from '@nestjs/common';
import UserModule from './modules/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import fs from 'fs';
import { join } from 'path';

export const typeormConfiguration = {
  type: process.env.type as any,
  host: process.env.host,
  port: Number(process.env.port),
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  autoLoadEntities: true,
  synchronize: false,
} as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfiguration),
    UserModule,
    JwtModule.register({
      global: true,
      secret: fs.readFileSync(join(__dirname, '../jwtRS256.key')),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
