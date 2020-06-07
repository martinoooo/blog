import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { join } from 'path';
import loadJs from './common/helper/loadJs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(logger);

  app.useStaticAssets(join(__dirname, '../..', 'client/dist'));
  app.useStaticAssets(join(__dirname, '../..', 'articles'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  loadJs();

  await app.listen(Number(process.env.PORT) || 8080);
}
bootstrap();
