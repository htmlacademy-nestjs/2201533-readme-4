import { Module } from '@nestjs/common';

import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigCommentsModule} from '@project/config/config-modules';
import {PostDeleteController} from './post-delete.controller';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    ConfigCommentsModule,
    CommentModule,
    LikeModule,
    PrismaModule
  ],
  controllers: [PostDeleteController],
  providers: [],
})
export class AppModule {}
