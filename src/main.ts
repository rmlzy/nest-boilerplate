import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { setupFilters, setupPipes, setupSwagger, Utils } from '~/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.enableCors();

  setupFilters(app);
  setupPipes(app);
  if (Utils.isDevelop()) {
    setupSwagger(app);
  }

  const port = app.get(ConfigService).get('SERVER_POST') || 3000;
  await app.listen(port);
  console.log(`Server started at http://localhost:${port}!`);
}
bootstrap();
