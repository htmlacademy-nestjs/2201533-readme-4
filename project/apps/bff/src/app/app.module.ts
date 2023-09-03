import { Module } from '@nestjs/common';
import { ConfigBffModule } from '@project/config/config-modules';
import { UsersController } from './users.controller';
import { CommentsController } from './comments.controller';
import { LikesController } from './likes.controller';
import { FollowersController } from './followers.controller';
import { PostsController } from './posts.controller';
import { FilesController } from './files.controller';
import { HttpModule } from '@nestjs/axios';
import { BffService } from './services/bff.service';
import {RabbitService} from './services/rabbit.service';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getHttpOptions, getRabbitMQOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    ConfigBffModule,
    HttpModule.registerAsync(getHttpOptions('http')),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  controllers: [
    UsersController,
    CommentsController,
    LikesController,
    FollowersController,
    PostsController,
  ],
  providers: [FilesController, BffService, RabbitService],
  exports: [FilesController],
})
export class AppModule {}
