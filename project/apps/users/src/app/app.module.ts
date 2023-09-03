import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from '@project/config/config-modules';
import { NotifyModule } from './notify/notify.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import {getMongooseOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
    UserModule,
    NotifyModule,
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
