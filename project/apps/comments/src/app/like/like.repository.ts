import {Injectable} from '@nestjs/common';
import {Like} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {LikeEntity} from './like.entity';

@Injectable()
export class LikeRepository{
  constructor(
    private readonly prisma: PrismaService
  ) {}
  async create(item: LikeEntity): Promise<Like> {
    return this.prisma.likes.create({
      data: {...item.toObject()}
    })
  }

  async delete(item: LikeEntity) {
    const queryString = `DELETE FROM likes WHERE "idPost"=${item.idPost} AND "idUser"='${item.idUser}'`;
    await this.prisma.$executeRawUnsafe(queryString);
    return {...item};
  }

  async find(item: LikeEntity): Promise<Like | null> {
    return this.prisma.likes.findFirst({
      where: {...item.toObject()}
    })
  }

  async deleteByPost(idPost: number): Promise<void> {
    await this.prisma.likes.deleteMany({
      where: {idPost: idPost}
    })
  }
}
