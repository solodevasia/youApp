import { Module } from '@nestjs/common';
import UserModule from '@youApp/modules/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import fs from 'fs';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import PublicController from '@youApp/controllers/public/public.controller';

export const typeormConfiguration = {
  type: process.env.type as any,
  host: process.env.host,
  port: Number(process.env.port),
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  autoLoadEntities: true,
  synchronize: true,
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../src/assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [PublicController],
  providers: [],
})
export class AppModule {}
