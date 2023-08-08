import {CRUDRepository} from '@project/util/util-types';
import {TagEntity} from './tag.entity';
import {Tag} from '@project/shared/shared-types'
import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class TagRepository implements CRUDRepository<TagEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TagEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  delete(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findById(idTag: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        idTag
      }
    });
  }

  update(id: number, item: TagEntity): Promise<Tag> {
    return Promise.resolve(undefined);
  }

  public async findByTag(tag: string): Promise<Tag> {
    return this.prisma.tag.findFirst({
      where: {
        tag
      }
    })
  }

  public async findOneOrCreate(tag: string): Promise<Tag> {
    console.log('tag.repository, ','findOneOrCreate ', tag);
    const found = await this.findByTag(tag);
    console.log(found);
    if (!found) {
      const entity = new TagEntity({tag})
      return this.create(entity);
    }
    return found;
  }

  public async findOrCreate(tags: string[]): Promise<Tag[]> {
    console.log('tag.repository, ','findOrCreate');
    console.log(tags);
    const promises = Array.from(tags, (tag) => this.findOneOrCreate(tag));
    console.log(promises);
    return Promise.all(promises);
  }

}
