import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { distFolder } from '@utils';
import { static as estatic } from 'express';
import { createLogger, transports, format } from 'winston';
import { WinstonModule, utilities } from 'nest-winston';

const projectName = 'STORYBOOK';

async function bootstrap() {
  const logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.ms(),
          utilities.format.nestLike(projectName, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      new transports.File({
        filename: __dirname + '/log/error.log',
        level: 'error',
      }), // - Write all logs with level `error` and below to `error.log`
      new transports.File({
        filename: __dirname + '/log/combined.log',
        format: format.simple(),
      }),
    ],
  });
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });

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
