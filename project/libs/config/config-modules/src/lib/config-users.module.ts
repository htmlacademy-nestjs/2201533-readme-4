import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {EnvPaths} from './env-paths';
import appConfig from './config/app.config';
import mongoConfig from './config/mongo.config';
import jwtUsersConfig from './config/jwt-users.config';
import rabbitConfig from './config/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtUsersConfig, rabbitConfig],
      envFilePath: EnvPaths.users
    }),
  ]
})
export class ConfigUsersModule {}
