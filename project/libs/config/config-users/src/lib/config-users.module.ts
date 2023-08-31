import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import {mongoConfig, rabbitConfig} from '@project/util/util-core';
import {jwtUsersConfig} from '@project/util/util-core';

const ENV_USERS_FILE_PATH = 'apps/users/.users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtUsersConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigUsersModule {}
