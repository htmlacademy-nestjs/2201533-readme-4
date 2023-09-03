import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';
import {EnvPaths} from "./env-paths";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig],
      envFilePath: EnvPaths.post
    }),
  ]
})
export class ConfigPostsModule {}
