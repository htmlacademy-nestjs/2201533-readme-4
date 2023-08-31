import {Injectable, OnModuleInit} from '@nestjs/common';
import {PrismaClient} from "@prisma/client/comments";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('comment prisma');
    await this.$connect();
  }
}
