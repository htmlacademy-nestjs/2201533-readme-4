import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {appConfig, appsConfig, httpConfig} from "@project/util/util-core";


const ENV_FILE_PATH = 'apps/bff/.bff.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, appsConfig, httpConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigBffModule {}
