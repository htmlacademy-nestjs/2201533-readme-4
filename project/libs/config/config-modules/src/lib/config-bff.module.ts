import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import appsConfig from './config/apps.config';
import httpConfig from './config/http.config';
import rabbitConfig from './config/rabbit.config';
import {EnvPaths} from "./env-paths";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, appsConfig, httpConfig, rabbitConfig],
      envFilePath: EnvPaths.bff
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigBffModule {}
