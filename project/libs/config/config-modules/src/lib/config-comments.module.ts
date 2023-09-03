import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {EnvPaths} from './env-paths';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig],
      envFilePath: EnvPaths.comments
    }),
  ]
})
export class ConfigCommentsModule {}
