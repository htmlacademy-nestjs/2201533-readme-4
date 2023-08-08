import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {CRUDRepository} from '@project/util/util-types';
import {PostEntity} from './post.entity';
import { Post } from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {ContentRepository} from '../content/content.repository';

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentRepository: ContentRepository
  ) {}

  public async create(item: PostEntity, tx?: PrismaService ): Promise<Post> {
    const entityData = item.toObject();
    return tx.post.create({
      data: {
        ...entityData,
        tags: {
          connect: entityData.tags.map(({idTag}) => ({ idTag }))
        }
      },
      include: {
        tags: true
      },
    });
  }

  public find(): Promise<Post[]> {

    return this.prisma.post.findMany({
      where: {
        // userId: '11',
        // type: 'photo',
        tags: {
          some: {
            tag: {in: ['#зима', '#немцы']}
          }
        }
      },
      include: {
        tags: true
      }
    });
  }

  public async delete(id: number, tx?: PrismaService): Promise<void> {
    await tx.post.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findFirstOrThrow({
      where: {id},
      include: {tags: true}
    })
  }

  update(id: number, item: PostEntity): Promise<Post> {
    return Promise.resolve(undefined);
  }


}
