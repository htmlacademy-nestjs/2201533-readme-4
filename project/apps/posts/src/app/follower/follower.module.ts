import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import {JwtAccessStrategy} from '@project/util/util-core';
import {FollowerRepository} from './follower.repository';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService, JwtAccessStrategy, FollowerRepository],
  imports: [PrismaModule]
})
export class FollowerModule {}
