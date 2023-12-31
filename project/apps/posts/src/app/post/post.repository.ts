import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@project/util/util-types';
import {PostEntity} from './post.entity';
import {Counters, Post} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {PostFilter, GetPostsFilter} from './helpers/posts-filter.interface';
import {makeGetPostsFilters} from './helpers/post-query.helpers';
import {Prisma} from '@prisma/client/posts';
import {SIMILARITY_LIMIT} from '@project/shared/shared-consts';
import dayjs from 'dayjs';
import {getShowTapeQueryText} from './helpers/getShowTapeQueryText';

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(item: PostEntity, tx?: PrismaService ): Promise<Post> {
    const prisma = tx ? tx : this.prisma;
    const entityData = item.toObject();
    return prisma.post.create({
      data: {
        ...entityData,
        tags: {
          connect: entityData.tags.map(({idTag}) => ({ idTag }))
        }
      },
      include: { tags: true },
    });
  }

  public async find(queryFilters: GetPostsFilter): Promise<Post[]> {
    const filters = makeGetPostsFilters(queryFilters);
    return this.prisma.post.findMany(filters);
  }

  public async getDrafts(userId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
        isPublished: false
      },
      include: { tags: true }
    })
  }

  public async setPublished(id: number, published: boolean): Promise<Post> {
    const data = {isPublished: published};
    if (published) {
      Object.assign(data, {pubDate: dayjs()})
    }
    return this.prisma.post.update({
      where: {id: id},
      data: {isPublished: published},
      include: { tags: true }
    })
  }

  public async findByTitle(ttl: string): Promise<Post[]> {
    this.prisma.$executeRawUnsafe(`SELECT set_limit(${SIMILARITY_LIMIT})`);
    const queryString = `SELECT id FROM titles WHERE title % '${ttl}'`;
    const ids: {id: number}[] = await this.prisma.$queryRawUnsafe(queryString);
    return this.prisma.post.findMany({
      where: {id: {
        in: ids.map((id) => id.id)
        }},
      include: {tags: true}
    })
  }

  public async delete(id: number, tx?: PrismaService): Promise<Post> {
    return tx.post.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<Post> {
    return this.prisma.post.findFirstOrThrow({
      where: {id: id},
      include: {tags: true}
    })
  }

  public async findOrNull(id: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {id: id}
    })
  }

  public async changeCount(id: number, field: Counters, difference: number) {
    const post = await this.findById(id);
    if (post === null) {
      return null;
    }
    const newCount = post[Counters[field]] + difference;
    const newPost = await this.prisma.post.update(
      {
        where: {id: id},
        data: {[Counters[field]]: newCount},
      }
    )
    return newPost[Counters[field]];
  }

  public async disconnectTags(id: number, tx?: PrismaService): Promise<void> {
    await tx.$queryRaw`DELETE FROM "_PostToTag" WHERE "A" = ${id}`
  }

  public async update(id: number, item: PostEntity, tx?: PrismaService): Promise<Post> {
    const prisma = tx ? tx : this.prisma;
    const tags = item.tags;
    const data: Prisma.PostUpdateInput = {
      ...item.toUpdateEntity()
    }
    if (tags.length){
      data.tags = {
          connect: item.tags.map(({idTag}) => ({ idTag }))
        }
    }
    return prisma.post.update(
      {
        where: {id},
        data: data,
        include: { tags: true },
      }
    )
  }

  public async getTape(idUser: string, filters: PostFilter): Promise<Post[]> {
    return this.prisma.$queryRawUnsafe(getShowTapeQueryText(idUser, filters));
  }

  public async findRepost(idUser: string, idPost: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where:{
        isRepost: true,
        userId: idUser,
        originalId: idPost
      }
    })
  }
}
