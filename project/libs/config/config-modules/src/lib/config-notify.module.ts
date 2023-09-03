import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {EnvPaths} from './env-paths';
import appsConfig from './config/apps.config';
import mongoConfig from './config/mongo.config';
import rabbitConfig from './config/rabbit.config';
import mailConfig from './config/mail.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appsConfig, mongoConfig, rabbitConfig, mailConfig],
      envFilePath: EnvPaths.notify
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigNotifyModule {}
