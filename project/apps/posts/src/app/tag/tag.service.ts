import { Injectable } from '@nestjs/common';
import {TagRepository} from './tag.repoditory';
import {CreateTagDto} from './dto/create-tag.dto';
import {Tag} from '@project/shared/shared-types';
import {TagEntity} from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository
  ) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const tagEntity = new TagEntity(dto);
    return this.tagRepository.create(tagEntity);
  }
}
