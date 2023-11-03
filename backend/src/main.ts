import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { distFolder } from '@utils';
import { static as estatic } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.use(estatic(distFolder));
  app.setBaseViewsDir(distFolder);

  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .addBearerAuth()
    .setDescription('The notes API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
