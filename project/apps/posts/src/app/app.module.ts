import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { ContentModule } from './content/content.module';
import { FollowerModule } from './follower/follower.module';
import { ConfigPostsModule } from '@project/config/config-posts';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigPostsModule,
    PrismaModule,
    PostModule,
    TagModule,
    ContentModule,
    FollowerModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
