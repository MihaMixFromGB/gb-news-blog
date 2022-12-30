import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from '../src/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'src/assets/images/'), {
    prefix: '/images',
  });

  await app.listen(3000);
  return app;
}
// bootstrap();
module.exports = bootstrap();
