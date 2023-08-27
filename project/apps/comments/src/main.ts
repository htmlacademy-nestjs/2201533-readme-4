/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Comments» service')
    .setDescription('Comments service API')
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const port = configService.get<number>('port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
