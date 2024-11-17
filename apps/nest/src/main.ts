import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: ['http://localhost:3000'],
    },
  });
  app.setGlobalPrefix('api/v1/');
  await app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });
}
bootstrap();
