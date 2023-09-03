import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {EnvPaths} from './env-paths';
import appConfig from "./config/app.config";
import mongoConfig from "./config/mongo.config";
import uploaderConfig from "./config/uploader.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, uploaderConfig],
      envFilePath: EnvPaths.uploader
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigUploaderModule {}
