import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import {TagModule} from '../tag/tag.module';
import {ContentModule} from '../content/content.module';
import {JwtAccessStrategy} from '@project/util/util-core';
import {NotifyModule} from '../notify/notify.module';

@Module({
  imports: [TagModule, ContentModule, NotifyModule],
  providers: [PostService, PostRepository, JwtAccessStrategy],
  controllers: [PostController],
})
export class PostModule {}
