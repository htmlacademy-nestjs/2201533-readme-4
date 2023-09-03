import {TagEntity} from './tag.entity';
import {Tag} from '@project/shared/shared-types'
import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {getDeleteQueryText} from "./helpers/getDeleteQueryText";

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TagEntity, tx?: PrismaService): Promise<Tag> {
    const prisma = tx ? tx : this.prisma;
    return prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public async clear(tags: Tag[]) {
    await this.prisma.$executeRawUnsafe(`${getDeleteQueryText(tags)}`)
  }

  public async findById(idTag: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        idTag
      }
    });
  }

  public async findByTag(tag: string): Promise<Tag> {
    return this.prisma.tag.findFirst({
      where: {
        tag: tag
      }
    })
  }

  public async findOneOrCreate(tag: string, tx?: PrismaService): Promise<Tag> {
    const found = await this.findByTag(tag);
    if (!found) {
      const entity = new TagEntity({tag: tag})
      return this.create(entity, tx);
    }
    return found;
  }

  public async findOrCreate(tags: string[], tx?: PrismaService): Promise<Tag[]> {
    const promises = Array.from(tags, (tag) => this.findOneOrCreate(tag, tx));
    return Promise.all(promises);
  }

}
