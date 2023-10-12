import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/exception/http.filter';
import { GlobalInterceptor } from './common/interceptor/global.interceptor';
import { setupSwagger } from './utils';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new GlobalInterceptor());

  setupSwagger(app);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
