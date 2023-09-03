import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import {LikeRepository} from './like.repository';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeService]
})
export class LikeModule {}
