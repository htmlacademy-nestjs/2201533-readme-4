import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import {TagModule} from '../tag/tag.module';
import {ContentModule} from '../content/content.module';
import {PostFilters} from './post.filters';

@Module({
  imports: [TagModule, ContentModule],
  providers: [PostService, PostRepository, PostFilters],
  controllers: [PostController],
})
export class PostModule {}
