import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {appConfig, rabbitConfig} from '@project/util/util-core';
import {jwtConfig} from '@project/util/util-core';

const ENV_POSTS_FILE_PATH = 'apps/posts/.posts.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_POSTS_FILE_PATH
    }),
  ]
})
export class ConfigPostsModule {}
