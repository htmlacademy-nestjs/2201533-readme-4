import { Module } from '@nestjs/common';

import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigCommentsModule} from "@project/config/config-comments";

@Module({
  imports: [
    ConfigCommentsModule,
    CommentModule,
    LikeModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
