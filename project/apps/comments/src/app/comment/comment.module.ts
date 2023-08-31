import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import {CommentRepository} from './comment.repository';
import {JwtAccessStrategy} from '@project/util/util-core';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, JwtAccessStrategy],
})
export class CommentModule {}
