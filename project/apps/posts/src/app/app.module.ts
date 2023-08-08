import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [PrismaModule, PostModule, TagModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
