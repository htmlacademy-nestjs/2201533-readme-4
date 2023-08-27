import { Module } from '@nestjs/common';
import { ConfigBffModule } from '@project/config/config-modules';
import { UsersController } from './users.controller';
import { CommentsController } from './comments.controller';
import { LikesController } from './likes.controller';
import { FollowersController } from './followers.controller';
import { PostsController } from './posts.controller';
import { FilesController } from './files.controller';
import {HttpModule} from '@nestjs/axios';
import {getHttpOptions} from '@project/util/util-core';

@Module({
  imports: [
    ConfigBffModule,
    HttpModule.registerAsync(getHttpOptions('http'))
  ],
  controllers: [
    UsersController,
    CommentsController,
    LikesController,
    FollowersController,
    PostsController,
  ],
  providers: [FilesController],
  exports: [FilesController]
})
export class AppModule {}
