import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserRepository} from './user.repository';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModel, UserSchema} from '@project/models/mongo-schemas';
import {JwtModule} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/shared/modules-options';
import {NotifyModule} from '../notify/notify.module';
import {JwtAccessStrategy} from '@project/util/util-core';
import {LocalStrategy} from './strategies/local.strategy';
import {RefreshTokenModule} from '../refresh-token/refresh-token.module';
import {JwtRefreshStrategy} from './strategies/jwt-refresh.strategy';
import {CounterController} from './counter.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule,
    RefreshTokenModule
  ],
  providers: [
    UserService,
    UserRepository,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy
  ],
  controllers: [UserController, CounterController],
  exports: [UserRepository]
})
export class UserModule {}
