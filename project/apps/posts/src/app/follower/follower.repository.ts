import {FollowerEntity} from './follower-entity';
import {Follower} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class FollowerRepository
{
  constructor(
    private readonly prisma: PrismaService
  ) {}
  public async create(item: FollowerEntity): Promise<Follower> {
    const record = await this.prisma.followers.findFirst({
      where: {...item}
    });
    if (record) {
      return record;
    }
    return this.prisma.followers.create({
       data: {...item.toObject()}
    });
  }

  public async delete(item: FollowerEntity): Promise<void> {
    await this.prisma.followers.deleteMany({
      where: {...item}
    })
  }

  public async count(followed: string): Promise<number> {
    return this.prisma.followers.count({
      where: {followed: followed}
    })
  }

  public async findFollow(follower: string, followed: string) {
    return this.prisma.followers.findFirst( {
      where: {
        followed,
        follower
      }
    })
  }

}
