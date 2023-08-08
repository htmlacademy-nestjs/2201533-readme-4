import { Module } from '@nestjs/common';
import { TagRepository } from './tag.repoditory';
import { TagService } from './tag.service';

@Module({
  providers: [TagRepository, TagService],
  exports: [TagRepository]
})
export class TagModule {}
