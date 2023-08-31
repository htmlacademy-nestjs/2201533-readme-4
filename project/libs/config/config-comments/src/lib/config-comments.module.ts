import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';

const ENV_COMMENTS_FILE_PATH = 'apps/comments/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig],
      envFilePath: ENV_COMMENTS_FILE_PATH
    }),
  ]
})
export class ConfigCommentsModule {}
