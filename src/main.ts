import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/exception/http.filter';
import { GlobalInterceptor } from './common/interceptor/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new GlobalInterceptor());

  await app.listen(3000);
}
bootstrap();
