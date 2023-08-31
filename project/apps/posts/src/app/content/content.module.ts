import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import {ContentRepository} from './content.repository';

@Module({
  providers: [ContentService, ContentRepository],
  exports: [ContentRepository]
})
export class ContentModule {}
