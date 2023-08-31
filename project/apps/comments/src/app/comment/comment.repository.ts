import {Injectable} from '@nestjs/common';
import {CommentEntity} from './comment.entity';
import {Comment, CommentsFilterInterface} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  async create(item: CommentEntity): Promise<Comment> {
    return this.prisma.comments.create({
      data: {...item.toObject()}
    })
  }

  async delete(id: number): Promise<void> {
    await this.prisma.comments.delete({
      where: {id}
    })
  }

  async findById(id: number): Promise<Comment | null> {
    return this.prisma.comments.findFirst({
      where:{id}
    });
  }

  async find(idPost: number, filters: CommentsFilterInterface) {
    return this.prisma.comments.findMany({
      where: {idPost: idPost},
      take: filters.limit,
      skip: (filters.page - 1) * filters.limit
    })
  }

  async deleteByPost(idPost: number): Promise<void> {
    await this.prisma.comments.deleteMany({
      where: {idPost: idPost}
    })
  }
}
